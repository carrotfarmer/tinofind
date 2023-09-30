import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

import { z } from "zod";

export const itemRouter = createTRPCRouter({
	getItems: publicProcedure
		.query(async ({ ctx }) => {
			return await ctx.db.item.findMany();
		}),

	reportItem: protectedProcedure
		.input(
			z.object({
				name: z.string(),
				description: z.string(),
				location: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.item.create({
				data: {
					name: input.name,
					description: input.description,
					location: input.location,
					reportedById: ctx.session.user.id,
					claimedById: null,
				}
			})
		})
});

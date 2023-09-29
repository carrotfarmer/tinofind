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
				description: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.item.create({
				data: {
					name: input.name,
					description: input.description,
					reportedById: ctx.session.user.id,
					claimedById: null,
				}
			})
		})
});

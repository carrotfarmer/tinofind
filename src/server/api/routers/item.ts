import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

import { z } from "zod";
import { ItemType } from "~/types";

export const itemRouter = createTRPCRouter({
	getItems: publicProcedure
		.input(
			z.object({
				limit: z.number().default(10),
				cursor: z
					.object({
						reportedById: z.string(),
						id: z.number(),
					})
					.optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const items = await ctx.db.item.findMany({
				cursor: input.cursor ? { reportedById_id: input.cursor } : undefined,
				take: input.limit + 1,
				orderBy: {
					createdAt: "desc",
				},
				include: {
					reportedBy: true,
					claimedBy: true,
				},
			});

			let nextCursor: typeof input.cursor | undefined = undefined;
			if (items.length > input.limit) {
				const lastItem = items.pop();

				if (lastItem) {
					nextCursor = {
						id: lastItem.id,
						reportedById: lastItem.reportedById!,
					};
				}
			}

			return {
				items,
				nextCursor,
			};
		}),

	reportItem: protectedProcedure
		.input(
			z.object({
				name: z.string(),
				description: z.string(),
				location: z.string(),
				pictureUrl: z.string().url().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.item.create({
				data: {
					name: input.name,
					description: input.description,
					location: input.location,
					reportedById: ctx.session.user.id,
					picture: input.pictureUrl,
					claimedById: null,
				},
			});
		}),

	claimItem: protectedProcedure
		.input(
			z.object({
				itemId: z.number(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.item.update({
				where: {
					id: input.itemId,
				},
				data: {
					claimedById: ctx.session.user.id,
				},
			});
		}),

	getUserReportedItems: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db.item.findMany({
			where: {
				reportedById: ctx.session.user.id,
			},
			include: {
				claimedBy: true,
			},
		});
	}),

	markAsFound: protectedProcedure
		.input(
			z.object({
				itemId: z.number(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.item.delete({
				where: {
					id: input.itemId,
					reportedById: ctx.session.user.id,
				},
			});
		}),

	allItems: protectedProcedure
		.query(async ({ ctx }): Promise<ItemType[]> => {
			const items = await ctx.db.item.findMany({
				include: {
					reportedBy: true,
					claimedBy: true,
				}
			});

			return items as ItemType[];
		})
});

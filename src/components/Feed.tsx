import React from 'react'

import { api } from '~/utils/api';
import { Button } from './ui/button';

import { ReportLostItem } from './item/ReportLostItem';
import { Item } from './item/Item';

export const Feed: React.FC = ({ }) => {
	const postsQuery = api.item.getItems.useInfiniteQuery(
		{
			limit: 10,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
			// initialCursor: 1, // <-- optional you can pass an initialCursor
		}
	);

	const items = postsQuery.data?.pages.flatMap((page) => page.items) ?? [];

	return (
		<div>
			<ReportLostItem />

			<div className="flex justify-center pt-5">
				<div className="w-full max-w-xl">
					{items ? items.map((item) => (
						<Item key={item.id} item={item} />
					)) : (
						<div className="text-red-500 font-bold">
							could not load items
						</div>
					)}
					{postsQuery.hasNextPage && (
						<div className="flex justify-center pt-5">
							<Button
								onClick={() => void postsQuery.fetchNextPage()}
								disabled={postsQuery.isFetchingNextPage}
							>
								{postsQuery.isFetchingNextPage ? "loading..." : "load more"}
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

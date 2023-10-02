import type { Item as ItemType, User } from '@prisma/client';
import React from 'react'
import { Button } from '../ui/button';
import { api } from '~/utils/api';

interface ItemProps {
	item: ItemType & {
		reportedBy: User;
		claimedBy: User | null;
	};
}

export const Item: React.FC<ItemProps> = ({ item }) => {
	const utils = api.useContext();
	const { mutate: claimItem } = api.item.claimItem.useMutation({
		onSuccess: async () => {
			await utils.invalidate();
		}
	});

	return (
		<div className="pt-2">
			<div className="flex flex-col bg-white shadow-sm rounded-md p-5 border-2 border-gray-100">
				<div className="flex flex-row gap-2">
					<div className="text-gray-700 text-lg font-medium">
						{item.name}
					</div>
					<div className="text-xs pt-1.5 text-gray-500">
						reported by <b>{item.reportedBy.name}</b>
					</div>
					{item.claimedBy && (
						<div className="text-xs pt-1.5 text-gray-500">
							claimed by <b>{item.claimedBy.name}</b>
						</div>
					)}
				</div>
				<div className="text-gray-400 text-xs">
					{item.description}
				</div>
				<div className="text-gray-500 text-sm pt-2">
					Last seen at <b>{item.location}</b>
				</div>
				<div className="pt-2">
					<Button variant="outline" size="sm" onClick={() => claimItem({ itemId: item.id })}>
						claim item
					</Button>
				</div>
			</div>
		</div>
	);
}

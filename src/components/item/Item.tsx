import type { Item as ItemType, User } from '@prisma/client';
import React from 'react'

interface ItemProps {
	item: ItemType & {
		reportedBy: User;
		claimedBy: User | null;
	};
}

export const Item: React.FC<ItemProps> = ({ item }) => {
	return (
		<div className="pt-2">
			<div className="flex justify-center">
				<div className="w-full max-w-xl">
					<div className="flex flex-col bg-white shadow-sm rounded-md p-5 border-2 border-gray-100">
						<div className="flex justify-between">
							<div className="flex items-center">
								<div className="flex flex-col">
									<div className="flex flex-row gap-2">
										<div className="text-gray-700 text-lg font-medium">
											{item.name}
										</div>
										<div className="text-xs pt-1.5 text-gray-500">
											reported by <b>{item.reportedBy.name}</b>
										</div>
									</div>
									<div className="text-gray-400 text-xs">
										{item.description}
									</div>
									<div className="text-gray-500 text-sm pt-2">
										Last seen at <b>{item.location}</b>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

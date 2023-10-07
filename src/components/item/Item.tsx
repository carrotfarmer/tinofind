import React, { useState } from "react";
import Image from "next/image";

import { api } from "~/utils/api";
import type { ItemType } from "~/types";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "~/components/ui/alert-dialog";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface ItemProps {
	item: ItemType;
}

export const Item: React.FC<ItemProps> = ({ item }) => {
	const { data: sessionData } = useSession();
	const { toast } = useToast();

	const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

	const utils = api.useContext();
	const { mutate: claimItem } = api.item.claimItem.useMutation({
		onSuccess: async () => {
			await utils.invalidate();

			toast({
				title: "Claimed Item",
				description:
					"You have successfully claimed this item. Your email and other information has been shared with the reporter.",
				duration: 10000,
			});
		},
	});

	return (
		<div className="pt-2">
			<AlertDialog
				open={isConfirmationOpen}
				onOpenChange={setIsConfirmationOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you sure you want to claim this item?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Your email and other profile information will be shared with the
							reporter, so that they can get back to you about the item. This
							action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<div className="pt-2">
							<AlertDialogAction onClick={() => claimItem({ itemId: item.id })}>
								Continue
							</AlertDialogAction>
						</div>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<div className="flex flex-col rounded-md border-2 border-gray-100 bg-white p-5 shadow-sm">
				<div className="flex flex-row gap-2">
					<div className="text-lg font-medium text-gray-700">{item.name}</div>
					<div className="pt-1.5 text-xs text-gray-500">
						reported by <b>{item.reportedBy.name}</b>
					</div>
					{item.claimedBy && (
						<div className="pt-1.5 text-xs text-gray-500">
							claimed by <b>{item.claimedBy.name}</b>
						</div>
					)}
				</div>
				<div className="text-xs text-gray-400">{item.description}</div>
				<div className="pt-2 text-sm text-gray-500">
					Last seen at <b>{item.location}</b>
				</div>
				{(item.picture && item.picture !== "") && (
					<div className="pt-2">
						<Link href={item.picture} target="_blank">
							<Image
								src={item.picture}
								alt="item picture"
								width={300}
								height={300}
							/>
						</Link>
					</div>
				)}
				{sessionData && !item.claimedBy && (
					<div className="pt-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsConfirmationOpen(true)}
						>
							claim item
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

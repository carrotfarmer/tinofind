import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { Button } from "../ui/button";
import { api } from "~/utils/api";

export const ReportLostItem: React.FC = ({ }) => {
	const { data: sessionData } = useSession();

	const { mutate: reportItem } = api.item.reportItem.useMutation();

	const [name, setName] = useState<string>("");

	const handleSubmit = () => {
		reportItem({
			name,
			description: "test",
		});
		setName("");
	};

	return (
		<div>
			<div className="flex justify-center">
				{sessionData ? (
					<Button>report a lost item</Button>
				) : (
					<Button disabled>sign in to report a lost item</Button>
				)}
			</div>

			<div className="flex justify-center pt-5">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
					<input
						type="text"
						placeholder="green iphone 13"
						onChange={(e) => setName(e.currentTarget.value)}
					/>
					<Button className="pt-5" type="submit">
						report
					</Button>
				</form>
			</div>
		</div>
	);
};

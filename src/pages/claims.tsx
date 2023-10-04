import type { NextPage } from "next";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

import { Loading } from "~/components/Loading";
import { Navbar } from "~/components/Navbar";
import { PageHead } from "~/components/PageHead";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Contact } from "lucide-react";
import Link from "next/link";

const ClaimsPage: NextPage = () => {
	const router = useRouter();
	const { data: sessionData, status } = useSession();

	const { data: reportedItemsData, isLoading } =
		api.item.getUserReportedItems.useQuery();

	if (status === "loading" || isLoading) {
		return <Loading />;
	}

	if (!sessionData) {
		router.push("/");
	}

	return (
		<>
			<PageHead title="Item Claims | tinofind" />
			<Navbar />

			<main className="pt-5">
				<div className="flex justify-center">
					<h1 className="text-4xl font-extrabold text-red-700 underline underline-offset-4">
						claims
					</h1>
				</div>

				{reportedItemsData?.map((item) => (
					<div className="flex justify-center pt-5" key={item.id}>
						<Card className="w-[500px]">
							<CardHeader>
								<CardTitle>{item.name}</CardTitle>
								<CardDescription>{item.description}</CardDescription>
							</CardHeader>
							<CardContent>
								{item.claimedBy ? (
									<div className="text-sm text-red-700">
										This item is claimed by a user: <br /> Name:{" "}
										<b>{item.claimedBy.name}</b><br />
										Email: <b>{item.claimedBy.email}</b>
									</div>
								) : (
									<div className="text-sm">This item is not yet claimed.</div>
								)}
							</CardContent>
							{item.claimedBy && (
								<CardFooter>
									<Link href={`mailto:${item.claimedBy.email}`}>
										<Button variant="outline">
											<Contact className="mr-2 h-4 w-4" /> contact owner
										</Button>
									</Link>
								</CardFooter>
							)}
						</Card>
					</div>
				))}
			</main>
		</>
	);
};

export default ClaimsPage;

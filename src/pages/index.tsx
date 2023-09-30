import Head from "next/head";

import { Navbar } from "~/components/Navbar";
import { ReportLostItem } from "~/components/item/ReportLostItem";
import { Loading } from "~/components/Loading";

import { api } from "~/utils/api";

export default function Home() {
	const { data: itemsData, isLoading } = api.item.getItems.useQuery();

	if (isLoading) {
		return <Loading />
	}

	return (
		<>
			<Head>
				<title>tinofind</title>
				<meta name="description" content="CHS Lost & Found" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<main>
				<div className="pt-5">
					<ReportLostItem />
				</div>
			</main>
		</>
	);
}

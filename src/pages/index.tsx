import Head from "next/head";
import { Navbar } from "~/components/Navbar";
import { ReportLostItem } from "~/components/item/ReportLostItem";
import { api } from "~/utils/api";

export default function Home() {
	const { data: itemsData, isLoading } = api.item.getItems.useQuery();

	if (isLoading) {
		return (
			<div className="flex justify-center pt-5">
				loading...
			</div>
		)
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
				<div className="pt-5 flex justify-center">
					hello
				</div>

				<div className="pt-5">
					<ReportLostItem />
				</div>

				{itemsData?.map((item) => (
					<div className="pt-3" key={item.id}>
						{item.name}
					</div>
				))}
			</main>
		</>
	);
}

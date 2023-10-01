import Head from "next/head";

import { Navbar } from "~/components/Navbar";
import { ReportLostItem } from "~/components/item/ReportLostItem";
import { Loading } from "~/components/Loading";

import { api } from "~/utils/api";
import { Feed } from "~/components/Feed";

export default function Home() {
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
					<Feed />
				</div>
			</main>
		</>
	);
}

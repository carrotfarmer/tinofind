import Head from "next/head";
import { Navbar } from "~/components/Navbar";
import { ReportLostItem } from "~/components/item/ReportLostItem";

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
				<div className="pt-5 flex justify-center">
					hello
				</div>

				<div className="pt-5">
					<ReportLostItem />
				</div>
			</main>
		</>
	);
}

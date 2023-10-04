import Head from "next/head";
import React from "react";

interface PageHeadProps {
	title: string;
	description?: string;
}

export const PageHead: React.FC<PageHeadProps> = ({
	title,
	description = "CHS Lost & Found",
}) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
};

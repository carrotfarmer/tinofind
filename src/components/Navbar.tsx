import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "./ui/button";

export const Navbar: React.FC = () => {
	const { data: sessionData, status } = useSession();

	return (
		<div>
			<div className="flex w-full justify-between border-b border-slate-200 p-4 shadow-md">
				<div className="flex items-center">
					<Link href="/">
						<h1 className="text-red-700 text-2xl font-extrabold">tinofind</h1>
					</Link>
				</div>
				<div className="flex items-center">
					<div className="grid grid-cols-2">
						{status === "loading" ? <Button disabled>loading</Button> :
							sessionData ? (
								<Button onClick={() => void signOut()}>sign out</Button>
							) : (
								<Button onClick={() => void signIn()}>sign in</Button>
							)}
					</div>
				</div>
			</div>
		</div>
	)
};

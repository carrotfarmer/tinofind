import React from "react"
import { Loader2 } from "lucide-react"

import { Navbar } from "./Navbar"

export const Loading: React.FC = () => (
	<>
		<Navbar />
		<div className="flex justify-center pt-5">
			<div className="h-4 w-4 animate-spin">
				<Loader2 />
			</div>
		</div>
	</>
)

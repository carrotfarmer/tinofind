import type { NextPage } from "next";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Navbar } from "~/components/Navbar";
import { Loading } from "~/components/Loading";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import { useToast } from "~/components/ui/use-toast";
import { PageHead } from "~/components/PageHead";
import { UploadButton } from "~/utils/uploadthing";
import { useState } from "react";

import "@uploadthing/react/styles.css";

const formSchema = z.object({
	itemName: z
		.string()
		.min(3, { message: "name must be longer than 3 chars" })
		.max(100, { message: "name must be shorter than 100 chars" }),
	itemDescription: z
		.string()
		.min(5, { message: "description must be longer than 5 chars" })
		.max(1024, { message: "description must be shorter than 1024 chars" }),
	itemLocation: z
		.string()
		.min(3, { message: "location must be longer than 3 chars" })
		.max(100, { message: "location must be shorter than 100 chars" }),
});

type FormData = z.infer<typeof formSchema>;

const ReportPage: NextPage = () => {
	const { data: sessionData, status } = useSession();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	const { toast } = useToast();

	const router = useRouter();

	const utils = api.useContext();
	const { mutate: reportItem } = api.item.reportItem.useMutation({
		onSuccess: async () => {
			await utils.invalidate();

			toast({
				title: "successfully reported item",
			});

			reset();
		},
		onError: (error) => {
			toast({
				title: "could not report item",
				description: error.message,
				variant: "destructive",
			});
		},
	});

	const [imageUrl, setImageUrl] = useState<string>("");

	if (status === "loading") {
		return <Loading />;
	}

	if (!sessionData) {
		return (
			<>
				<PageHead title="Sign in required | tinofind" />
				<Navbar />

				<div className="flex justify-center pt-5">
					<p>sign in to report a lost item</p>
				</div>
			</>
		);
	}

	const onSubmit = (data: FormData) => {
		reportItem({
			name: data.itemName,
			description: data.itemDescription,
			location: data.itemLocation,
			pictureUrl: imageUrl,
		});
		router.push("/");
	};

	return (
		<>
			<PageHead title="Report Lost Item | tinofind" />
			<Navbar />

			<main className="pt-5">
				<div className="flex justify-center">
					<h1 className="text-4xl font-extrabold text-red-700">
						report a lost item
					</h1>
				</div>

				<div className="flex justify-center pt-5">
					<form
						className="flex w-1/2 flex-col"
						// eslint-disable-next-line
						onSubmit={handleSubmit(onSubmit)}
					>
						<Label
							className="pb-2 pt-3 text-lg font-bold text-red-700"
							aria-required={true}
						>
							item name
						</Label>
						<Input
							className="rounded-md border border-slate-200 p-2"
							type="text"
							placeholder="green iPhone 13"
							required
							{...register("itemName")}
						/>
						<p className="p-2 text-xs text-red-700">
							{errors.itemName?.message}
						</p>

						<Label
							className="pb-2 pt-3 text-lg font-bold text-red-700"
							aria-required={true}
						>
							item description
						</Label>
						<Textarea
							className="rounded-md border border-slate-200 p-2"
							placeholder="slightly scratched iPhone 13, with a black case"
							required
							{...register("itemDescription")}
						/>
						<p className="p-2 text-xs text-red-700">
							{errors.itemDescription?.message}
						</p>

						<Label
							className="pb-2 pt-3 text-lg font-bold text-red-700"
							aria-required={true}
						>
							last seen location
						</Label>
						<Input
							className="rounded-md border border-slate-200 p-2"
							type="text"
							placeholder="the library"
							required
							{...register("itemLocation")}
						/>
						<p className="p-2 text-xs text-red-700">
							{errors.itemLocation?.message}
						</p>

						<div className="flex justify-center">
							<UploadButton
								className="mt-4 leading-7 ut-button:bg-red-700 ut-button:ut-readying:bg-red-700/50 [&:not(:first-child)]:mt-6"
								endpoint="imageUploader"
								onClientUploadComplete={(res) => {
									setImageUrl(res![0]!.url);
									toast({
										title: "Upload Complete",
										description: "Image uploaded successfully",
									});
								}}
								onUploadError={(error: Error) => {
									toast({
										title: "Something went wrong!",
										description: `${error.message} please try again`,
										variant: "destructive",
									});
								}}
							/>
						</div>
						<p className="pt-1 text-xs">image is optional, but recommended</p>

						<Button
							className="mt-2 rounded-md bg-red-700 p-2 text-white hover:bg-red-800"
							disabled={isSubmitting}
						>
							submit
						</Button>
					</form>
				</div>
			</main>
		</>
	);
};

export default ReportPage;

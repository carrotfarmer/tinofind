import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const fileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({ image: { maxFileSize: "4MB" } })
		.onUploadComplete(({ }) => {
			console.log("uploaded")
		})
} satisfies FileRouter;

export type OurFileRouter = typeof fileRouter;

import { getServerSession } from "next-auth";

import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const fileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({ image: { maxFileSize: "4MB" } })
		.onUploadComplete(({ _, file }) => {
			return file.url;
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof fileRouter;

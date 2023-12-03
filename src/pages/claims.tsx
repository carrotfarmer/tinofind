import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

import { Loading } from "~/components/Loading";
import { Navbar } from "~/components/Navbar";
import { PageHead } from "~/components/PageHead";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";

import { Check, Contact } from "lucide-react";
import { useState } from "react";
import { AlertDialog } from "~/components/AlertDialog";

const ClaimsPage: NextPage = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const { data: sessionData, status } = useSession();

  const { data: reportedItemsData, isLoading } =
    api.item.getUserReportedItems.useQuery();

  const utils = api.useContext();
  const { mutate: deleteItem } = api.item.deleteItem.useMutation({
    onSuccess: async () => {
      await utils.invalidate();

      toast({
        title: "item has been claimed",
        description: "the item has been claimed",
      });
    },
  });

  if (status === "loading" || isLoading) {
    return <Loading />;
  }

  if (!sessionData) {
    router.push("/");
  }

  return (
    <>
      <PageHead title="Item Claims | tinofind" />
      <Navbar />

      <main className="pt-5">
        <div className="flex justify-center">
          <h1 className="text-4xl font-extrabold text-red-700 underline underline-offset-4">
            claims
          </h1>
        </div>

        {reportedItemsData?.map((item) => (
          <div className="flex justify-center pt-5" key={item.id}>
            <AlertDialog
              title="Are you sure you want to mark this item as found?"
              description="This action cannot be reversed. Please make sure the item has been returned to the owner before marking it as found."
              open={isConfirmationOpen}
              onOpenChange={setIsConfirmationOpen}
              onConfirm={() => deleteItem({ itemId: item.id })}
            />

            <Card className="w-[500px]">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {item.claimedBy ? (
                  <div className="text-sm text-red-700">
                    This item is claimed by a user: <br /> Name:{" "}
                    <b>{item.claimedBy.name}</b>
                    <br />
                    Email: <b>{item.claimedBy.email}</b>
                  </div>
                ) : (
                  <div className="text-sm">This item is not yet claimed.</div>
                )}
              </CardContent>
              {item.claimedBy && (
                <CardFooter>
                  <Link href={`mailto:${item.claimedBy.email}`}>
                    <Button variant="outline">
                      <Contact className="mr-2 h-4 w-4" /> contact owner
                    </Button>
                  </Link>
                  <div className="pl-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsConfirmationOpen(true)}
                    >
                      <Check className="mr-2 h-4 w-4" /> mark item as returned
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        ))}
      </main>
    </>
  );
};

export default ClaimsPage;

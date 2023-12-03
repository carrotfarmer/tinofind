import React from "react";
import { useSession } from "next-auth/react";

import { Button } from "../ui/button";
import { useRouter } from "next/router";

export const ReportLostItem: React.FC = ({}) => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-center text-sm font-bold">
        Found an item? Report it here!
      </div>
      <div className="flex justify-center pt-4">
        {sessionData ? (
          <div className="grid grid-cols-3 gap-4">
            <Button onClick={() => void router.push("/report")}>
              report a lost item
            </Button>
            <Button onClick={() => void router.push("/claims")}>
              item claims
            </Button>
            <Button onClick={() => void router.push("/search")}>
              look up items
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <Button disabled>sign in to report a lost item</Button>
            <Button onClick={() => void router.push("/search")}>
              look up items
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

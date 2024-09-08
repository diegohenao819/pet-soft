"use client";
import { createCheckoutSession } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <main className="flex justify-center flex-col text-center gap-2">
      <h1>PetSoft requires a payment </h1>
      {!searchParams.success && (
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              await createCheckoutSession();
            });
          }}
        >
          Buy lifetime access for $299
        </Button>
      )}

      {searchParams.success && (
        <h2 className="text-sm text-green-700">Payment successful!</h2>
      )}

      {searchParams.cancelled && (
        <h2 className="text-sm text-red-700">Payment cancelled</h2>
      )}
    </main>
  );
};

export default Page;

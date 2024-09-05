"use client";
import { createCheckoutSession } from "@/actions/actions";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <main className="flex justify-center flex-col text-center gap-2">
      <h1>PetSoft requires a payment </h1>
      <Button
        onClick={async () => {
          await createCheckoutSession();
        }}
      >
        Buy lifetime access for $299
      </Button>
    </main>
  );
};

export default page;

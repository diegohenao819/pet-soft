"use client";
import { createCheckoutSession } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useTransition } from "react";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [isPending, startTransition] = useTransition();
  const { data: session, update, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/signup") {
      router.push("/payment");
    }
  }, [pathname, router]);

  return (
    <main className="flex justify-center flex-col text-center gap-2">
      <h1>PetSoft requires a payment </h1>
      {searchParams.success && (
        <Button
          onClick={async () => {
            await update(true);
            router.push("/app/dashboard");
          }}
          disabled={status === "loading" || session?.user.hasAccess}
        >
          Access PetSoft
        </Button>
      )}

      {pathname !== "/signup" && !searchParams.success && (
        <Button
          disabled={isPending}
          onClick={() => {
            createCheckoutSession();
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

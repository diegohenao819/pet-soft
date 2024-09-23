import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row items-center justify-center h-screen space-x-4 gap-5 bg-background">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="PetSoft"
        width={400}
        height={500}
      />

      <div className="w-[30%]">
        <Logo />
        <h1 className="text-4xl font-bold mt-2">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className=" mt-2">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for $59.
        </p>

        <div className="mt-4 space-x-4">
          <Button asChild>
            <Link href="/signup"> Get started </Link>
          </Button>

          <Button variant="secondary" asChild>
            <Link href="/login"> Log in </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

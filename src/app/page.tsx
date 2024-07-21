import { Logo } from "@/components/Logo";
import Image from "next/image";

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
        <h1 className="text-4xl font-bold"
        >
         Manage your <span className="font-extrabold">pet daycare</span> with ease
        </h1>
        <p className=" mt-2"
        > Use PetSoft to easily keep track of pets under your care. Get lifetime access for $59.</p>
      </div>
    </main>
  );
}

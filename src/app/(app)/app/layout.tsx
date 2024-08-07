import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import Background from "@/components/background";
import PetContextProvider from "@/contexts/PetContextProvider";
import SearchContextProvider from "@/contexts/SearchContextProvider";
import React from "react";
import prisma  from "@/lib/db";


const layout = async ({ children }: { children: React.ReactNode }) => {
  
  const pets = await prisma?.pet.findMany()

  return (
    <>
      <Background />
      <div className="max-w-[1250px] mx-auto flex flex-col ">
        <AppHeader />

        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
    </>
  );
};

export default layout;

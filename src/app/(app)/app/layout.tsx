import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import Background from "@/components/background";
import PetContextProvider from "@/contexts/PetContextProvider";
import SearchContextProvider from "@/contexts/SearchContextProvider";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch pets");
  }

  const data = await response.json();
  console.log(data);

  return (
    <>
      <Background />
      <div className="max-w-[1250px] mx-auto flex flex-col ">
        <AppHeader />

        <SearchContextProvider>
          <PetContextProvider data={data}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
    </>
  );
};

export default layout;

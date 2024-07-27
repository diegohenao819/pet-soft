"use client";

import { usePetContext } from "@/lib/hooks";
import Image from "next/image";
import ButtonPet from "./ButtonPet";


const PetDetails = () => {
  const { selectedPet } = usePetContext();

  return (
    <main className="flex flex-col h-full w-full">
      {!selectedPet ? (
        <div> No selected pet :::: </div>
      ) : (


        <section className="flex flex-col h-full w-full">


          <div className="flex items-center border-b p-4 bg-white">
            <Image
              src={selectedPet.imageUrl}
              alt={selectedPet.name}
              height={80}
              width={80}
              className="rounded-full h-[80px] w-[80px] object-cover "
            />
            <h2 className="text-black text-2xl font-bold ml-4 ">
              {selectedPet.name}
            </h2>
           

        <div className="ml-auto gap-4 flex">
          <ButtonPet actionType="edit">Edit</ButtonPet>
          <ButtonPet actionType="delete">Delete</ButtonPet>
        </div>

          </div>






          {/* // Pet's info: owner's name and age */}
          <section className="flex justify-around p-8 mt-4 text-center">
            <div>
              <p className="font-semibold">OWNER NAME</p>
              <p> {selectedPet.ownerName}</p>
            </div>
            <div>
              <p className="font-semibold">OWNER AGE</p>
              <p> {selectedPet.age}</p>
            </div>
          </section>


          {/* Section for notes */}
          <div className=" mx-8 px-7 py-6 mb-4 rounded-md flex-1 flex border border-black/10 bg-white ">
            {selectedPet.notes}
          </div>


        </section>
      )}
    </main>
  );
};

export default PetDetails;

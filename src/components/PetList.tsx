"use client";

import { usePetContext } from "@/lib/hooks";
import { PetType } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

const PetList = () => {
  const { pets, selectedPetId, handlePetIdChange } = usePetContext() || {
    pets: [],
    selectedPetId: null,
    handlePetIdChange: () => {},
  };

  return (
    <ul className="bg-white border-b border-light w-full h-full">
      {pets.map((pet: PetType) => {
        return (
          <li key={pet.id}>
            <button
              className={cn(
                "flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition",
                selectedPetId === pet.id && "bg-[#EFF1F2]"
              )}
              onClick={() => handlePetIdChange(pet.id)}
            >
        
           
              <Image
                src={pet.imageUrl}
                width={45}
                height={45}
                alt={`${pet.name} avatar`}
                className="rounded-full object-cover w-[45px] h-[45px]"
              />
              <p className="font-semibold"> {pet.name}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default PetList;

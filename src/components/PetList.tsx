"use client";

import { usePetContext, useSearchContext } from "@/lib/hooks";
import { PetType } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

const PetList = () => {
  const { pets, selectedPetId, handlePetIdChange } = usePetContext() || {
    pets: [],
    selectedPetId: null,
    handlePetIdChange: () => {},
  };

  const { searchQuery } = useSearchContext();

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ul className="bg-white/10 border-b border-light w-full h-full">
      {filteredPets.map((pet: PetType) => {
        return (
          <li key={pet.id}>
            <button
              className={cn(
                "flex items-center bg-white border-b h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition",
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

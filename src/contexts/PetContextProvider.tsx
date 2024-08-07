"use client";

import { addPet } from "@/actions/actions";
import { PetType } from "@/lib/types";
import React, { createContext, useState } from "react";

export const PetContext = createContext<ValuesPetContextProviderProps | null>(
  null
);

type PetContextProviderProps = {
  children: React.ReactNode;
  data: PetType[];
};

type ValuesPetContextProviderProps = {
  pets: PetType[];
  selectedPetId: string | null;
  selectedPet: PetType | undefined;
  numberPets: number;
  handlePetIdChange: (id: string) => void;
  handleNewPet: (newPet: PetType) => void;
  handleEditPet: (petId: string, newPet: Omit<PetType, "id">) => void;
  handleDeletePet: (petId: string) => void;
};

const PetContextProvider = ({ children, data }: PetContextProviderProps) => {
  // states
  const [pets, setPets] = useState<PetType[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // Derived states
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberPets = pets.length;

  // functions
  const handlePetIdChange = (id: string) => {
    setSelectedPetId(id);
  };

  const handleNewPet = async (newPet: Omit<PetType, "id">) => {
    await addPet(newPet);
  };

  const handleEditPet = (petId: string, newPet: Omit<PetType, "id">) => {
    setPets((prevPets) =>
      prevPets.map((pet) => {
        if (pet.id === petId) {
          return { ...newPet, id: pet.id };
        }
        return pet;
      })
    );
  };


  const handleDeletePet = (petId: string) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
    console.log("Pet deleted");
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        handlePetIdChange,
        selectedPetId,
        selectedPet,
        numberPets,
        handleNewPet,
        handleEditPet,
        handleDeletePet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;

"use client";

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

  const handleNewPet = (newPet: Omit<PetType, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setPets((prevPets) => [...prevPets, { ...newPet, id }]);
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
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;

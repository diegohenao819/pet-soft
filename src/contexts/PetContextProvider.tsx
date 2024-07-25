"use client";

import React, { createContext, useState } from "react";
import { PetType } from "@/lib/types";

export const PetContext = createContext<ValuesPetContextProviderProps | null>(null);

type PetContextProviderProps = {
  children: React.ReactNode;
  data: PetType[];
};

type ValuesPetContextProviderProps = {
  pets: PetType[];
  selectedPetId: string | null;
  selectedPet: PetType | undefined;
  handlePetIdChange: (id: string) => void;
};

const PetContextProvider = ({ children, data }: PetContextProviderProps) => {
  const [pets, setPets] = useState<PetType[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = pets.find((pet) => pet.id === selectedPetId);

  const handlePetIdChange = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        handlePetIdChange,
        selectedPetId,
        selectedPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;

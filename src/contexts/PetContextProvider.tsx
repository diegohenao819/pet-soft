"use client";

import { PetEssentials } from "@/lib/types";
import { Pet as PetType}  from "@prisma/client";
import React, { createContext, useOptimistic, useState } from "react";

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
  handleNewPet: (newPet: PetEssentials) => void;
  handleEditPet: (petId: string, newPet: PetEssentials) => void;
  handleDeletePet: (petId: string) => void;
};

const PetContextProvider = ({ children, data }: PetContextProviderProps) => {
  // states

  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, payload];
        case "edit":
          return state.map((pet) => {
            if (pet.id === payload.id) {
              return { ...payload, id: pet.id };
            }
            return pet;
          });
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    }
  );

  // Derived states
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberPets = optimisticPets.length;

  // functions
  const handlePetIdChange = (id: string) => {
    setSelectedPetId(id);
  };

  const handleNewPet = async (newPet: PetEssentials) => {
    setOptimisticPets({ action: "add", payload: newPet });
  };

  const handleEditPet = (petId: string, newPet: PetEssentials) => {
    setOptimisticPets({ action: "edit", payload: { id: petId, ...newPet } });
    console.log("desde handleEditPet");
  };

  const handleDeletePet = (petId: string) => {
    setOptimisticPets({ action: "delete", payload: petId });
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
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

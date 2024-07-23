"use client";

import { PetType } from "@/lib/types";
import { createContext, useState } from "react";

export const PetContext = createContext<ValuesPetContextProviderProps | null>(
  null
);

type PetContextProviderProps = {
  children: React.ReactNode;
  data: PetType[];
};

type ValuesPetContextProviderProps = {
  pets: PetType[];
  selectedPetId: String | null;
  setSelectedPetId: (id: String) => void;
};

const PetContextProvider = ({ children, data }: PetContextProviderProps) => {
  const [pets, setPets] = useState<PetType[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<String | null>(null);

  return (
    <PetContext.Provider
      value={{
        pets,
        setSelectedPetId,
        selectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;

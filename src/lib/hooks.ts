import React, { useContext } from "react"; 
import { PetContext } from "@/contexts/PetContextProvider";

export const usePetContext = () => {
    const context = useContext(PetContext);
    if (!context) {
        throw new Error("usePetContext must be used within a PetContextProvider");
    }
    return context;
};

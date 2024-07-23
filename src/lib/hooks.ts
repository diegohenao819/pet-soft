import { PetContext } from "@/contexts/PetContextProvider";
import { useContext } from "react";


export const usePetContext = () => {
    const context = useContext(PetContext);
    if (context === undefined) {
        throw new Error("usePetContext must be used within a PetContextProvider");
    }
    return context;
}

import { useContext } from "react"; 
import { PetContext } from "@/contexts/PetContextProvider";
import { searchContext } from "@/contexts/SearchContextProvider";

export const usePetContext = () => {
    const context = useContext(PetContext);
    if (!context) {
        throw new Error("usePetContext must be used within a PetContextProvider");
    }
    return context;
};



export const useSearchContext = () => {
    const context = useContext(searchContext);
    if (!context) {
        throw new Error("useSearchContext must be used within a SearchContextProvider");
    }
    return context;
}
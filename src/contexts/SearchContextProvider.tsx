"use client";

import { createContext, useState } from "react";

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type ValuesSearchContextProviderProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const searchContext =
  createContext<ValuesSearchContextProviderProps | null>(null);

const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <searchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

export default SearchContextProvider;

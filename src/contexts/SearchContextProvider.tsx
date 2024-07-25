"use client";

import { createContext, useState } from "react";

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type ValuesSearchContextProviderProps = {
  searchQuery: string;
  handleSearchQueryChange: (query: string) => void;
};

export const searchContext =
  createContext<ValuesSearchContextProviderProps | null>(null);

const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  // states
  const [searchQuery, setSearchQuery] = useState("");

  // Derived states

  // Event handlers
  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <searchContext.Provider
      value={{
        searchQuery,
        handleSearchQueryChange,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

export default SearchContextProvider;

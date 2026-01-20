import React, {createContext, useContext, useState} from "react";

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({children}: {children: React.ReactNode}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{searchQuery, setSearchQuery}}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
};

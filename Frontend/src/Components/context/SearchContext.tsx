// src/context/SearchContext.tsx
import { createContext, useContext, useState,type ReactNode} from "react";

export interface Song {
  _id: string;
  title: string;
  artist: string;
  image: string;
  audio: string; 
}

interface SearchContextType {
  results: Song[];
  setResults: (songs: Song[]) => void;
  clearResults: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResultsState] = useState<Song[]>([]);

  const setResults = (song: Song[]) => setResultsState(song);
  const clearResults = () => setResultsState([]);

  return (
    <SearchContext.Provider value={{ results, setResults, clearResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

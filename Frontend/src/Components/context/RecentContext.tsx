import React, { createContext, useContext, useEffect, useState } from "react";

// ✅ Song type definition
interface RecentSong {
  id: string;
  title: string;
  artist: string;
  image: string;
  url: string;
}

interface RecentContextType {
  recent: RecentSong[];
  addToRecent: (song: RecentSong) => void;
  removeFromRecent: (id: string) => void;
}

// ✅ Create the context
const RecentContext = createContext<RecentContextType | undefined>(undefined);

// ✅ Provider component
export const RecentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recent, setRecent] = useState<RecentSong[]>(() => {
    const stored = localStorage.getItem("recent");
    return stored ? JSON.parse(stored) : [];
  });

  // ✅ Sync with localStorage
  useEffect(() => {
    localStorage.setItem("recent", JSON.stringify(recent));
  }, [recent]);

  // ✅ Add song to recent
  const addToRecent = (song: RecentSong) => {
    setRecent((prev) => {
      // Remove if it already exists
      const filtered = prev.filter((item) => item.id !== song.id);
      const updated = [song, ...filtered]; // Add new song at the top
      return updated.slice(0, 10); // Limit to last 10 songs
    });
  };

  // ✅ Remove from recent
  const removeFromRecent = (id: string) => {
    setRecent((prev) => prev.filter((song) => song.id !== id));
  };

  return (
    <RecentContext.Provider value={{ recent, addToRecent, removeFromRecent }}>
      {children}
    </RecentContext.Provider>
  );
};

// ✅ Custom hook for easy usage
export const useRecent = () => {
  const context = useContext(RecentContext);
  if (!context) {
    throw new Error("useRecent must be used within a RecentProvider");
  }
  return context;
};

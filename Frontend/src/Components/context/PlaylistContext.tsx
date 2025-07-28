import React, { createContext, useContext, useEffect, useState } from "react";

// Song type definition
export interface Song {
  id: string;
  title: string;
  artist: string;
  image: string;
  url: string;
}

// Context type
interface PlaylistContextType {
  playlist: Song[];
  addToPlaylist: (song: Song) => void;
  removeFromPlaylist: (id: string) => void;
}

// Create the context
const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

// Provider component
export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlist, setPlaylist] = useState<Song[]>(() => {
    const stored = localStorage.getItem("playlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

  const addToPlaylist = (song: Song) => {
    const exists = playlist.find((item) => item.id === song.id);
    if (!exists) {
      setPlaylist((prev) => [...prev, song]);
    }
  };

  const removeFromPlaylist = (id: string) => {
    setPlaylist((prev) => prev.filter((song) => song.id !== id));
  };

  return (
    <PlaylistContext.Provider value={{ playlist, addToPlaylist, removeFromPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

// Custom hook for easy usage
export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }
  return context;
};

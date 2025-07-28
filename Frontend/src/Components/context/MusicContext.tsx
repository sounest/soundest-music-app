import { createContext, useContext, useState, type ReactNode } from "react";

export interface Song {
  title: string;
  artist: string;
  image: string;
  audio: string;
}

interface MusicContextType {
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;
  playSongList: (songs: Song[], startIndex: number) => void;
  nextSong: () => void;
  prevSong: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider = ({ children }: MusicProviderProps) => {
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const currentSong = playlist[currentIndex] || null;

  const setCurrentSong = (song: Song) => {
    if (currentSong?.audio === song.audio) return; // ✅ Prevent duplicate reload
    setPlaylist([song]);
    setCurrentIndex(0);
  };

  const playSongList = (songs: Song[], startIndex: number) => {
    setPlaylist(songs);
    setCurrentIndex(startIndex);
  };

  const nextSong = () => {
    if (playlist.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  };

  const prevSong = () => {
    if (playlist.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        playSongList,
        nextSong,
        prevSong,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};

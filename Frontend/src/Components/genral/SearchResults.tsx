import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiDotsVertical } from "react-icons/hi";
import { FaMusic, FaPlus } from "react-icons/fa";
import { usePlaylist } from "../context/PlaylistContext";
import { useMusic } from "../context/MusicContext";
import { useLocation } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

// ✅ Unified Song type with optional dates
interface Song {
  _id: string;
  title: string;
  artist: string;
  genre?: string;
  image: string;
  audio: string;
  createdAt?: string;
  updatedAt?: string;
}

const BASE_URL = "http://localhost:5000";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SongList = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const { addToPlaylist } = usePlaylist();
  const { playSongList } = useMusic();
  const { results: searchResults, setResults, clearResults } = useSearch();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  // ✅ Fetch trending songs
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/songs`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch songs");
        const data: Partial<Song>[] = await res.json();

        const updatedSongs: Song[] = data.map((song) => ({
          _id: song._id || "",
          title: song.title || "Unknown",
          artist: song.artist || "Unknown",
          genre: song.genre || "",
          image: song.image ? `${BASE_URL}/${song.image}` : "/images/default.jpg",
          audio: song.audio ? `${BASE_URL}/${song.audio}` : "",
          createdAt: song.createdAt,
          updatedAt: song.updatedAt,
        }));

        setTimeout(() => {
          setSongs(updatedSongs);
          setLoading(false);
        }, 3000);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  // ✅ Fetch search results if query exists
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          const res = await fetch(`${BASE_URL}/api/songs/search?q=${query}`);
          const data: Partial<Song>[] = await res.json();

          const updatedData: Song[] = data.map((song) => ({
            _id: song._id || "",
            title: song.title || "Unknown",
            artist: song.artist || "Unknown",
            genre: song.genre || "",
            image: song.image
              ? song.image.startsWith("http")
                ? song.image
                : `${BASE_URL}${song.image}`
              : "/images/default.jpg",
            audio: song.audio
              ? song.audio.startsWith("http")
                ? song.audio
                : `${BASE_URL}${song.audio}`
              : "",
            createdAt: song.createdAt,
            updatedAt: song.updatedAt,
          }));

          setResults(updatedData);
        } catch (err) {
          console.error(err);
        }
      } else {
        clearResults();
      }
    };

    fetchSearchResults();
  }, [query, setResults, clearResults]);

  const handlePlaySong = (song: Song, list: Song[]) => {
    const fullList = list.map((s) => ({
      title: s.title,
      artist: s.artist,
      image: s.image ?? "/images/default.jpg",
      audio: s.audio ?? "",
    }));

    const startIndex = list.findIndex((s) => s._id === song._id);
    playSongList(fullList, startIndex);
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-16 w-full">
      <motion.section
        className="w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* ✅ Search Results */}
        {query ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-green-400">
              🔍 Search Results for "{query}"
            </h2>
            {searchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center mt-20 text-gray-400">
                <FaMusic size={60} className="mb-4 text-green-500" />
                <p className="text-xl font-semibold">No songs found.</p>
                <p className="text-sm mt-2">Try searching something else!</p>
              </div>
            ) : (
              <motion.div
                className="flex flex-col gap-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {searchResults.map((song) => (
                  <motion.div
                    key={song._id}
                    onClick={() => handlePlaySong(song, searchResults)}
                    className="bg-gray-900 p-4 rounded-xl shadow-md hover:shadow-xl relative cursor-pointer"
                    variants={cardVariants}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-[60px] w-[60px] bg-gray-800 rounded-md overflow-hidden">
                        <img
                          src={song.image}
                          alt={song.title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h3 className="text-sm font-semibold truncate">{song.title}</h3>
                        <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                      </div>
                      <button
                        aria-label="Add to Playlist"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToPlaylist({
                            id: song._id,
                            title: song.title,
                            artist: song.artist,
                            image: song.image,
                            url: song.audio,
                          });
                        }}
                        className="text-[green] hover:text-[#6fe06f]"
                      >
                        <FaPlus size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        ) : (
          <>
            {/* ✅ Trending Songs */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-5">🎵 Trending Now</h2>

            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-300 mt-4 text-sm">Loading songs...</p>
                </div>
              </div>
            )}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && !error && (
              <motion.div
                className="flex flex-col gap-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {songs.map((song) => (
                  <motion.div
                    key={song._id}
                    onClick={() => handlePlaySong(song, songs)}
                    className="bg-gray-900 p-4 rounded-xl shadow-md hover:shadow-xl relative cursor-pointer"
                    variants={cardVariants}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-[60px] w-[60px] bg-gray-800 rounded-md overflow-hidden">
                        <img
                          src={song.image}
                          alt={song.title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h3 className="text-sm font-semibold truncate">{song.title}</h3>
                        <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                      </div>
                      <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <HiDotsVertical
                          size={20}
                          className="cursor-pointer text-white hover:text-gray-400"
                          onClick={() => setOpenId((prev) => (prev === song._id ? null : song._id))}
                        />
                        {openId === song._id && (
                          <div className="absolute top-6 right-0 bg-gray-800 text-white shadow-lg rounded-md p-3 z-10 w-[160px]">
                            <p
                              className="cursor-pointer hover:text-[#35c935]"
                              onClick={() => {
                                addToPlaylist({
                                  id: song._id,
                                  title: song.title,
                                  artist: song.artist,
                                  image: song.image,
                                  url: song.audio,
                                });
                                setOpenId(null);
                              }}
                            >
                              ➕ Add to Playlist
                            </p>
                            <p
                              className="cursor-pointer hover:text-[#35c935]"
                              onClick={() => {
                                handlePlaySong(song, songs);
                                setOpenId(null);
                              }}
                            >
                              ▶️ Play
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </motion.section>
    </div>
  );
};

export default SongList;

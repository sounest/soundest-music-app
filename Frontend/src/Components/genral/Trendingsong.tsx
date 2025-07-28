import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiDotsVertical } from "react-icons/hi";
import { usePlaylist } from "../context/PlaylistContext";
import { useRecent } from "../context/RecentContext";
import { useMusic } from "../context/MusicContext";

interface Song {
  _id: string;
  title: string;
  artist: string;
  genre?: string;
  image?: string;
  audio?: string;
  createdAt: string;
  updatedAt: string;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ✅ Shuffle for random order
const shuffleArray = (array: Song[]): Song[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Song = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const { addToPlaylist } = usePlaylist();
  const { playSongList } = useMusic();
  const { addToRecent } = useRecent();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/songs/trend-songs", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch songs");

        const data: Song[] = await res.json();

        const updatedSongs = data.map((song) => ({
          ...song,
          image: song.image
            ? `http://localhost:5000${song.image}`
            : "/images/default.jpg",
          audio: song.audio ? `http://localhost:5000${song.audio}` : "",
        }));

        const randomSongs = shuffleArray(updatedSongs);

        setTimeout(() => {
          setSongs(randomSongs);
          setLoading(false);
        }, 3000);
      } catch (error: unknown) {
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

  // ✅ Handle play & add to recent
  const handlePlaySong = (song: Song) => {
    const fullList = songs.map((s) => ({
      title: s.title,
      artist: s.artist,
      image: s.image || "/images/default.jpg",
      audio: s.audio || "",
    }));

    const startIndex = songs.findIndex((s) => s._id === song._id);
    playSongList(fullList, startIndex);

    addToRecent({
      id: song._id,
      title: song.title,
      artist: song.artist,
      image: song.image || "/images/default.jpg",
      url: song.audio || "",
    });
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-16 w-full">
      <motion.section
        className="w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-5">🎵 Trending Now</h2>

        {/* ✅ Loader */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-300 mt-4 text-sm">Loading songs...</p>
            </div>
          </div>
        )}

        {/* ✅ Error Message */}
        {error && (
          <p className="text-red-500 text-center mt-6">Error: {error}</p>
        )}

        {/* ✅ Song List */}
        {!loading && !error && songs.length > 0 && (
          <motion.div
            className="flex flex-col gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {songs.map((song) => (
              <motion.div
                key={song._id}
                onClick={() => handlePlaySong(song)}
                className="bg-gray-900 p-4 rounded-xl shadow-md hover:shadow-xl relative cursor-pointer"
                variants={cardVariants}
                whileInView="visible"
                initial="hidden"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4">
                  {/* ✅ Song Image */}
                  <div className="h-[60px] w-[60px] bg-gray-800 rounded-md overflow-hidden">
                    {song.image ? (
                      <img
                        src={song.image}
                        alt={song.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-opacity duration-500"
                      />
                    ) : (
                      <span className="text-gray-500 text-xs flex items-center justify-center h-full">
                        No Image
                      </span>
                    )}
                  </div>

                  {/* ✅ Song Info */}
                  <div className="flex-1 overflow-hidden">
                    <h3 className="text-sm font-semibold truncate">
                      {song.title}
                    </h3>
                    <p className="text-xs text-gray-400 truncate">
                      {song.artist}
                    </p>
                    {song.genre && (
                      <p className="text-[10px] text-gray-500 truncate">
                        Genre: {song.genre}
                      </p>
                    )}
                  </div>

                  {/* ✅ Dropdown */}
                  <div
                    className="relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <HiDotsVertical
                      size={20}
                      className="cursor-pointer text-white hover:text-gray-400"
                      onClick={() =>
                        setOpenId((prev) =>
                          prev === song._id ? null : song._id
                        )
                      }
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
                              image: song.image || "/images/default.jpg",
                              url: song.audio || "#",
                            });
                            setOpenId(null);
                          }}
                        >
                          ➕ Add to Playlist
                        </p>
                        <p
                          className="cursor-pointer hover:text-[#35c935]"
                          onClick={() => {
                            // Download logic (future)
                            setOpenId(null);
                          }}
                        >
                          ⬇️ Download
                        </p>
                        <p
                          className="cursor-pointer hover:text-[#35c935]"
                          onClick={() => {
                            handlePlaySong(song);
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
      </motion.section>
    </div>
  );
};

export default Song;

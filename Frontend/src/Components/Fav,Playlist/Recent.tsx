import { useEffect } from "react";
import {  FaMusic, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRecent } from "../context/RecentContext";
import { useMusic } from "../context/MusicContext";

const Recent = () => {
  const { recent, removeFromRecent } = useRecent();
  const { playSongList } = useMusic();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ Handle Play
  const handlePlay = (index: number) => {
    playSongList(
      recent.map((song) => ({
        title: song.title,
        artist: song.artist,
        image: song.image,
        audio: song.url,
      })),
      index
    );
  };

  // ✅ Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* ✅ Empty State */}
        {recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-20 text-gray-400">
            <FaMusic size={60} className="mb-4 text-blue-500" />
            <p className="text-xl font-semibold">No recently played songs.</p>
            <p className="text-sm mt-2">Start listening to see songs here!</p>
          </div>
        ) : (
          <motion.div
            className="flex flex-col gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {recent.map((song, index) => (
              <motion.div
                key={song.id}
                onClick={() => handlePlay(index)}
                className="bg-gray-900 p-4 rounded-xl shadow-md hover:shadow-blue-500/50 relative cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  {/* ✅ Song Image */}
                  <div className="h-[60px] w-[60px] bg-gray-800 rounded-md overflow-hidden">
                    {song.image ? (
                      <img
                        src={song.image}
                        alt={song.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-xs flex items-center justify-center h-full">
                        No Image
                      </span>
                    )}
                  </div>

                  {/* ✅ Song Details */}
                  <div className="flex-1 overflow-hidden">
                    <h3 className="text-sm font-semibold truncate">
                      {song.title}
                    </h3>
                    <p className="text-xs text-gray-400 truncate">
                      {song.artist}
                    </p>
                  </div>

                  {/* ✅ Remove Button */}
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromRecent(song.id);
                      }}
                      className="text-red-400 hover:text-red-600 transition"
                      title="Remove from Recent"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Recent;

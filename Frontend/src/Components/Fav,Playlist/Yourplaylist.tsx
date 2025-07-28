import { usePlaylist } from "../context/PlaylistContext";
import { useMusic } from "../context/MusicContext";
import { FaMusic, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const YourPlaylist = () => {
  const { playlist, removeFromPlaylist } = usePlaylist();
  const { playSongList } = useMusic();

  const handlePlay = (index: number) => {
    playSongList(
      playlist.map((song) => ({
        title: song.title,
        artist: song.artist,
        image: song.image,
        audio: song.url,
      })),
      index
    );
  };

  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-16 w-full">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* ✅ Header */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-400">
            🎼 Your Playlist
          </h1>
          <Link
            to="/allsongs"
            className="px-6 py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-full shadow-lg hover:shadow-blue-400 transition-all duration-300"
          >
            + Add More Songs
          </Link>
        </div>

        {/* ✅ Empty State */}
        {playlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-20 text-gray-400">
            <FaMusic size={60} className="mb-4 text-blue-500" />
            <p className="text-xl font-semibold">
              No songs in your playlist yet.
            </p>
            <p className="text-sm mt-2">
              Go add some favorites to see them here!
            </p>
          </div>
        ) : (
          <motion.div
            className="flex flex-col gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {playlist.map((song, index) => (
              <motion.div
                key={song.id}
                onClick={() => handlePlay(index)}
                className="bg-gray-900 p-4 rounded-xl shadow-md hover:shadow-blue-500/50 relative cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                variants={cardVariants}
              >
                <div className="flex items-center gap-4">
                  {/* ✅ Song Image */}
                  <div className="h-[60px] w-[60px] bg-gray-800 rounded-md overflow-hidden">
                    {song.image ? (
                      <img
                        src={song.image}
                        alt={song.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                        removeFromPlaylist(song.id);
                      }}
                      className="text-red-400 hover:text-red-600 transition"
                      title="Remove from Playlist"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default YourPlaylist;

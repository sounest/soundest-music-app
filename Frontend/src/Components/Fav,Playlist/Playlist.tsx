import { useState } from "react";
import { FaHeartBroken, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbtack } from "react-icons/fa6";

interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
}

const Playlist = () => {
  const [favs, setFavs] = useState<Song[]>([]); // Start with an empty playlist

  const removeFav = (id: number) => {
    setFavs(favs.filter((song) => song.id !== id));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        
        <Link to="/yoursong">
          <div className="flex items-center w-full sm:w-[400px] bg-[#1e1e1e] gap-4 rounded-xl p-4 hover:bg-[#2a2a2a] transition">
            
            <div className="min-w-[64px] min-h-[64px] bg-gradient-to-br from-purple-500 to-indigo-600 rounded-md flex items-center justify-center">
              <FaThumbsUp className="text-white text-2xl" />
            </div>

           
            <div>
              <h2 className="text-lg font-semibold text-white">Liked Songs</h2>
              <p className="text-sm text-gray-400">Playlist</p>
            </div>
          </div>
        </Link>

        {/* Liked Songs Card */}
        {favs.length > 0 && (
          <div className="mb-10">
            <div className="bg-[#121212] text-white w-full max-w-md p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-md flex items-center justify-center">
                  <FaHeart className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Liked Songs</h2>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <FaThumbtack className="text-green-400" />
                    Playlist • {favs.length}{" "}
                    {favs.length === 1 ? "song" : "songs"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Playlist Content */}
        {favs.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400 text-center">
            <FaHeartBroken size={60} className="mb-4 text-red-500" />
            <p className="text-xl font-semibold">No songs in playlist.</p>
            <p className="text-sm mt-2">Start adding songs to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favs.map((song) => (
              <div
                key={song.id}
                className="bg-[#1e1e1e] rounded-xl shadow-md overflow-hidden transition hover:shadow-red-400 hover:shadow-lg"
              >
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{song.title}</h3>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                  <button
                    onClick={() => removeFav(song.id)}
                    className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 text-sm rounded-lg transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Playlist;

import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const ArtistProfile = () => {
  const navigate = useNavigate();
  const [artist, setArtist] = useState({
    username: "",
    email: "",
    coverimage: "",
    isartist: false,
    followers: 64,
    following: 120,
    songs: 0,
  });

  useEffect(() => {
    const storedArtist = localStorage.getItem("artist");
    if (storedArtist) {
      const parsedArtist = JSON.parse(storedArtist);
      if (parsedArtist.isartist) {
        setArtist({ ...artist, ...parsedArtist });
      } else {
        toast.error("Access denied: Not an artist");
        navigate("/");
      }
    } else {
      toast.error("No artist data found");
      navigate("/loginartist");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("artist");
    toast.success("Logged out successfully");
    navigate("/loginartist");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-black to-[#1a1a2e] text-white px-6 py-10">
      <ToastContainer />
      <motion.div
        className="max-w-5xl mx-auto bg-[#18181b] rounded-3xl shadow-lg p-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          🎵 Artist Profile
        </motion.h1>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative group"
          >
            <div className="">
              <img
                src={artist.coverimage || "https://via.placeholder.com/150"}
                alt="Artist Cover"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg group-hover:scale-105 transition duration-300"
              />
            </div>
            
          </motion.div>

          {/* Artist Info */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2 ">
              {artist.username}
            </h2>
            <p className="text-gray-400 text-sm mb-6">{artist.email}</p>

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-6 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{artist.followers}</p>
                <span className="text-gray-400 text-sm">Followers</span>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{artist.following}</p>
                <span className="text-gray-400 text-sm">Following</span>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{artist.songs}</p>
                <span className="text-gray-400 text-sm">Songs</span>
              </div>
            </div>

            
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#991b1b" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-6 py-2 rounded-full font-medium shadow-md transition-all"
            >
              Logout
            </motion.button>
            {/* <Link to="/admin/uploadsong">
            <motion.button
          
              whileHover={{ scale: 1.05, backgroundColor: "#991b1b" }}
              whileTap={{ scale: 0.95 }}
              // onClick={handleLogout}
              className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-6 py-2 rounded-full font-medium shadow-md transition-all"
            >
              upload song
            </motion.button>
            </Link> */}
          </motion.div>
        </div>

        {/* Expandable Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-[#a855f7]">
            🎶 Your Music Stats
          </h3>
          <p className="text-gray-400">
            No songs uploaded yet. Start sharing your music with the world!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ArtistProfile;

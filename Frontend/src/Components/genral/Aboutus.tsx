import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeadphones, FaMusic, FaRocket } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white px-4 py-12 sm:px-6 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-400 mb-4">
          🎵 About <span className="text-white">Soundest</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10">
          Soundest is your modern music companion — discover, listen, and vibe with millions of songs. Our mission is to empower every listener with personalized experiences and every artist with a global voice.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 text-left">
          <div className="bg-gray-900 rounded-xl p-6 shadow hover:shadow-blue-500 transition">
            <FaMusic size={30} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Endless Music</h3>
            <p className="text-sm text-gray-400">
              Access an ever-growing library of trending, classic, and niche songs from all around the globe.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 shadow hover:shadow-blue-500 transition">
            <FaHeadphones size={30} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Personalized Experience</h3>
            <p className="text-sm text-gray-400">
              Create playlists, follow your favorite artists, and enjoy music tailored just for you.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 shadow hover:shadow-blue-500 transition">
            <FaRocket size={30} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Built for Artists</h3>
            <p className="text-sm text-gray-400">
              Soundest offers a platform where emerging artists can upload, manage, and share their creations with the world.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow hover:scale-105 transition">
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default About;

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useMusic } from "../context/MusicContext";
import { useRecent } from "../context/RecentContext";

interface Song {
  _id: string;
  title: string;
  artist: string;
  image?: string;
  audio?: string;
}

const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const Home = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loveSongs, setLoveSongs] = useState<Song[]>([]);
  const [rapSongs, setRapSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingLove, setLoadingLove] = useState(true);
  const [loadingRap, setLoadingRap] = useState(true);

  const { playSongList } = useMusic();
  const { addToRecent } = useRecent();

  // ✅ Fetch Songs
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/songs/trend-songs`);
        const data: Song[] = await res.json();
        const updatedSongs = data.map((song) => ({
          ...song,
          image: song.image ? `http://localhost:5000${song.image}` : "/images/default.jpg",
          audio: song.audio ? `http://localhost:5000${song.audio}` : "",
        }));
        setSongs(shuffleArray(updatedSongs).slice(0, 10));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    const fetchLoveSongs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/songs/love-songs`);
        const data: Song[] = await res.json();
        const updated = data.map((song) => ({
          ...song,
          image: song.image ? `http://localhost:5000${song.image}` : "/images/default.jpg",
          audio: song.audio ? `http://localhost:5000${song.audio}` : "",
        }));
        setLoveSongs(shuffleArray(updated).slice(0, 10));
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingLove(false);
      }
    };
    fetchLoveSongs();
  }, []);

  useEffect(() => {
    const fetchRapSongs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/songs/rapsong`);
        const data: Song[] = await res.json();
        const updated = data.map((song) => ({
          ...song,
          image: song.image ? `http://localhost:5000${song.image}` : "/images/default.jpg",
          audio: song.audio ? `http://localhost:5000${song.audio}` : "",
        }));
        setRapSongs(shuffleArray(updated).slice(0, 10));
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingRap(false);
      }
    };
    fetchRapSongs();
  }, []);

  // ✅ Play Song
  const handlePlaySong = (song: Song, list: Song[]) => {
    const fullList = list.map((s) => ({
      title: s.title,
      artist: s.artist,
      image: s.image || "/images/default.jpg",
      audio: s.audio || "",
    }));

    const startIndex = list.findIndex((s) => s._id === song._id);

    playSongList(fullList, startIndex);

    addToRecent({
      id: song._id,
      title: song.title,
      artist: song.artist,
      image: song.image || "/images/default.jpg",
      url: song.audio || "#",
    });
  };

  // ✅ Slider Component with dynamic More button
  const CustomSlider = ({
    title,
    songs,
    loadingState,
    link,
  }: {
    title: string;
    songs: Song[];
    loadingState: boolean;
    link: string;
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollByAmount = 300;

    const scrollLeft = () => {
      containerRef.current?.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
    };

    const scrollRight = () => {
      containerRef.current?.scrollBy({ left: scrollByAmount, behavior: "smooth" });
    };

    return (
      <section className="py-10 px-4 sm:px-6 relative">
        <div className="flex items-center justify-between mb-6 max-w-7xl mx-auto px-3 sm:px-[70px]">
          <h3 className="text-lg sm:text-2xl font-bold">{title}</h3>
          <Link to={link}>
            <button className="text-red-500 hover:text-red-600 text-sm sm:text-base font-semibold">
              More →
            </button>
          </Link>
        </div>

        {loadingState ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="relative max-w-7xl mx-auto">
            {/* Scrollable container */}
            <div
              ref={containerRef}
              className="flex overflow-x-auto space-x-4 no-scrollbar scroll-smooth"
            >
              {songs.map((song) => (
                <motion.div
                  key={song._id}
                  className="min-w-[180px] sm:min-w-[220px] bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handlePlaySong(song, songs)}
                >
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="p-3 text-center">
                    <h4 className="text-sm sm:text-base font-semibold truncate">
                      {song.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 truncate">
                      {song.artist}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={scrollLeft}
              aria-label="Scroll left"
              title="Scroll left"
              className="hidden md:flex absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
            </button>

            <button
              onClick={scrollRight}
              aria-label="Scroll right"
              title="Scroll right"
              className="hidden md:flex absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRightIcon className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="bg-[#0a0f2c] min-h-screen text-white flex flex-col">
      {/* ✅ Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center px-4 sm:px-10 md:px-16 py-10 md:py-20 gap-8">
        <motion.div
          className="max-w-md text-center md:text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-red-500">Listen</span> to <br /> new music.
          </h2>
          <p className="text-gray-300 mb-8 text-sm sm:text-base leading-relaxed">
            "Welcome to Soundest - your ultimate music destination! Dive into
            trending hits, romantic melodies, party anthems, and soulful tracks
            that match every mood."
          </p>
          <div className="flex justify-center md:justify-center">
            <Link to="/allsongs">
              <button className="bg-transparent border border-gray-400 hover:border-red-500 px-6 py-3 rounded-full font-semibold text-sm sm:text-base">
                Find Your Beat!
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ✅ Sliders with dynamic "More →" buttons */}
      <CustomSlider
        title="Stay in the Trend. Play the 🔥Hits!"
        songs={songs}
        loadingState={loading}
        link="/Trendingsong"
      />
      <CustomSlider
        title="Feel the Rhythm of Love ❤️"
        songs={loveSongs}
        loadingState={loadingLove}
        link="/Lovesong"
      />
      <CustomSlider
        title="Spit the Truth, Feel the Beat 🎤"
        songs={rapSongs}
        loadingState={loadingRap}
        link="/Rapsong"
      />
    </div>
  );
};

export default Home;

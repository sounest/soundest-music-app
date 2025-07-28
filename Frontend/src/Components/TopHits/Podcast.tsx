
const podcastSongs = [
  {
    id: 1,
    title: "The Daily Buzz",
    host: "John Doe",
    duration: "24:15",
    cover: "https://via.placeholder.com/150", // replace with real image or local asset
  },
  {
    id: 2,
    title: "Mind Matters",
    host: "Dr. Smith",
    duration: "30:40",
    cover: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Tech Talks",
    host: "Sarah Lee",
    duration: "18:05",
    cover: "https://via.placeholder.com/150",
  },
];

const Podcast = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-16 px-4">
       <div className="">

<div className="max-w-6xl mx-auto">
  <h2 className="text-3xl font-semibold mb-8">🎉 Feel Good Tunes</h2>

  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    {podcastSongs.map((song) => (
      <div
        key={song.id}
        className="bg-[#1e1e1e] rounded-xl p-4 hover:bg-[#2a2a2a] transition"
      >
        <img
          src={song.cover}
          alt={song.title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold">{song.title}</h3>
        <p className="text-sm text-gray-400">Artist: {song.host}</p>
        <p className="text-sm text-gray-500">⏱ {song.duration}</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
          Play Now
        </button>
      </div>
    ))}
  </div>
</div>
</div>
    </div>
  );
};

export default Podcast;

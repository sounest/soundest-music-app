const relaxSongs = [
  {
    id: 1,
    title: "Ocean Breeze",
    artist: "Calm Waves",
    duration: "4:12",
    cover: "https://via.placeholder.com/150", // Replace with actual image
  },
  {
    id: 2,
    title: "Forest Light",
    artist: "Nature Soundz",
    duration: "3:45",
    cover: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Peaceful Nights",
    artist: "Dream Flow",
    duration: "5:03",
    cover: "https://via.placeholder.com/150",
  },
];

const Relax = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-16 px-4">
       <div className="">

<div className="max-w-6xl mx-auto">
  <h2 className="text-3xl font-semibold mb-8">🎉 Feel Good Tunes</h2>

  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    {relaxSongs.map((song) => (
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
        <p className="text-sm text-gray-400">Artist: {song.artist}</p>
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

export default Relax;

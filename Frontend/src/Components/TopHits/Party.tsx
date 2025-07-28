
const partySongs = [
  {
    id: 1,
    title: "Dance All Night",
    artist: "DJ Pulse",
    duration: "3:25",
    cover: "https://via.placeholder.com/150", // Replace with real image URLs
  },
  {
    id: 2,
    title: "Club Vibes",
    artist: "MC Blaze",
    duration: "4:05",
    cover: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Bass Drop",
    artist: "Electro Max",
    duration: "3:40",
    cover: "https://via.placeholder.com/150",
  },
];

const Party = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-16 px-4">

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8">🎉 Feel Good Tunes</h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {partySongs.map((song) => (
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
    
  );
};

export default Party;

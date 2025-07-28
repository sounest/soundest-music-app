import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Song {
  _id: string;
  title: string;
  cover: string;
  audio: string;
}

const ArtistSongs = () => {
  const { artistId } = useParams();
  const [songs, setSongs] = useState<Song[]>([]);

 
   useEffect(() => {
  axios
    .get(`http://localhost:5000/api/artist/artist/${artistId}`)
    .then((res) => setSongs(res.data))
    .catch((err) => console.error(err));
}, [artistId]);


  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Artist Songs</h2>
      {songs.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {songs.map((song) => (
            <div key={song._id} className="bg-gray-800 p-4 rounded-lg">
              <img
                src={`http://localhost:5000${song.cover}`}
                alt={song.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <p className="font-semibold">{song.title}</p>
              <audio controls className="w-full mt-2">
                <source src={`http://localhost:5000${song.audio}`} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No songs available for this artist.</p>
      )}
    </div>
  );
};

export default ArtistSongs;

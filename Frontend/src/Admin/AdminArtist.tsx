import { useEffect, useState } from "react";

interface Artist {
  _id: string;
  name: string;
  email: string;
  approved: boolean;
}

const artistURL = "http://localhost:5000/api/admin/artists";

const AdminArtists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all artists
  const fetchArtists = async () => {
    try {
      setLoading(true);
      const res = await fetch(artistURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ("token"),
        },
      });
      const data = await res.json();
      setArtists(data.artists || []);
    } catch (error) {
      console.error("Error fetching artists:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  // ✅ Approve artist
  const approveArtist = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/artists/:id/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: ("token"),
        },
        body: JSON.stringify({ approved: true }),
      });

      if (res.ok) {
        setArtists((prev) =>
          prev.map((a) => (a._id === id ? { ...a, approved: true } : a))
        );
      }
    } catch (error) {
      console.error("Error approving artist:", error);
    }
  };

  // ✅ Delete artist
  const handleDeleteArtist = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this artist?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/artists/:id1`, {
        method: "DELETE",
        headers: {
          Authorization: ("token"),
        },
      });

      if (res.ok) {
        setArtists((prev) => prev.filter((a) => a._id !== id));
      }
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Artists</h1>

      {loading ? (
        <p className="text-gray-400">Loading artists...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-red-500 text-white text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist) => (
                <tr
                  key={artist._id}
                  className="border-b border-gray-700 hover:bg-gray-800"
                >
                  <td className="p-3">{artist.name}</td>
                  <td className="p-3">{artist.email}</td>
                  <td className="p-3">
                    {artist.approved ? (
                      <span className="text-green-400 font-semibold">
                        Approved
                      </span>
                    ) : (
                      <span className="text-red-400 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    {!artist.approved && (
                      <button
                        onClick={() => approveArtist(artist._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteArtist(artist._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {artists.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400">
                    No artists found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminArtists;

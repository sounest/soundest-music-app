import { useEffect, useState } from "react";

type Artist = {
  _id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  isAdmin: string;
};

const AdminUsers = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);

  const URL = "http://localhost:5000/api/admin/artists";
  const deleteURL = "http://localhost:5000/api/admin/artists";
  const approveURL = "http://localhost:5000/api/admin/artists";

  const getAllArtists = async () => {
    setLoading(true);
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch artists");

      const data = await response.json();
      setArtists(data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllArtists();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this artist?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${deleteURL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete artist");

      setArtists((prev) => prev.filter((artist) => artist._id !== id));
    } catch (error) {
      console.error("Error deleting artist:", error);
    } finally {
      setLoading(false);
    }
  };

  const approveArtist = async (id: string) => {
    if (!window.confirm("Approve this artist?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${approveURL}/${id}/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!response.ok) throw new Error("Failed to approve artist");

      setArtists((prev) =>
        prev.map((artist) =>
          artist._id === id ? { ...artist, status: "approved" } : artist
        )
      );
    } catch (error) {
      console.error("Error approving artist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-black to-[#1a1a2e] text-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-[#a855f7]">
        🎧 Soundest Admin - Artists
      </h1>

      {loading ? (
        <p className="text-center text-gray-400 text-lg">Loading artists...</p>
      ) : artists.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          No artists found or only admins can view this.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-xl">
          <table className="min-w-full bg-[#1e1e2f] rounded-xl">
            <thead>
              <tr className="bg-[#2a2a40] text-left">
                <th className="px-6 py-3 text-sm font-semibold text-gray-300 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-300 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-300 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-300 uppercase">
                  Admin
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-300 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist) => (
                <tr
                  key={artist._id}
                  className="hover:bg-[#2b2b4b] transition duration-300"
                >
                  <td className="px-6 py-4 text-lg">{artist.username}</td>
                  <td className="px-6 py-4 text-gray-400">{artist.email}</td>
                  <td className="px-6 py-4 capitalize">{artist.role}</td>
                  <td className="px-6 py-4">
                    {artist.isAdmin === "true" ? "✅" : "❌"}
                  </td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      artist.status === "approved"
                        ? "text-[#22c55e]"
                        : "text-[#facc15]"
                    }`}
                  >
                    {artist.status}
                  </td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold text-white shadow-md transition duration-300 ${
                        artist.status === "approved"
                          ? "bg-[#4ade80] cursor-not-allowed"
                          : "bg-[#a855f7] hover:bg-[#9333ea]"
                      }`}
                      onClick={() => approveArtist(artist._id)}
                      disabled={artist.status === "approved"}
                    >
                      {artist.status === "approved" ? "Approved" : "Approve"}
                    </button>
                    <button
                      className="px-4 py-2 bg-[#ef4444] hover:bg-[#dc2626] rounded-lg font-semibold text-white shadow-md transition duration-300"
                      onClick={() => handleDelete(artist._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;

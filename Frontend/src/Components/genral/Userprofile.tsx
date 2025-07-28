import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/Auth";
import { motion } from "framer-motion";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser1 } = useAuth(); 

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleEditClick = () => setIsEditing(true);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not logged in");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to update profile");
        return;
      }

      toast.success("Profile updated successfully");
      if (formData.email !== user?.email) {
        toast.info("Email updated. Please check your inbox to verify.");
      }

      setUser1(data);
      localStorage.setItem("user", JSON.stringify(data));
      setIsEditing(false);
    } catch (error) {
      console.error("Save Error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] via-[#111113] to-[#1e1e2e] text-white px-6 py-10">
      <ToastContainer />
      <motion.div
        className="max-w-5xl mx-auto bg-[#181a24] rounded-3xl shadow-lg p-8 sm:p-12"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* ✅ Profile Header */}
        <motion.h1
          className="text-3xl sm:text-4xl font-bold mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your Profile
        </motion.h1>

        {/* ✅ Profile Content */}
        <div className="flex flex-col sm:flex-row items-center gap-8">
          {/* Profile Avatar */}
          <motion.div
            className="relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <div className="h-[140px] w-[140px] sm:h-[180px] sm:w-[180px] text-5xl sm:text-[100px] flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold shadow-lg">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
          </motion.div>

          {/* Profile Info */}
          <div className="flex-1 text-center sm:text-left">
            {isEditing ? (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-medium transition-all w-full sm:w-auto"
                >
                  Save Changes
                </motion.button>
              </motion.div>
            ) : (
              <>
                <motion.h2
                  className="text-2xl sm:text-3xl font-semibold mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {user?.username}
                </motion.h2>
                <motion.p
                  className="text-gray-400 mb-4 break-all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {user?.email}
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEditClick}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl font-medium transition-all w-full sm:w-auto"
                >
                  Edit Profile
                </motion.button>

                {/* Artist Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Want to become an artist?
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/artistprofile")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition-all w-full sm:w-auto"
                  >
                    Artist
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ✅ Playlist & Recent Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            className="bg-gray-900 p-6 rounded-2xl shadow-lg flex flex-col gap-4"
            whileHover={{ scale: 1.02 }}
          >
            <Link to="/yoursong" className="w-full">
              <h3 className="text-lg sm:text-xl bg-white text-black text-center font-bold px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                Your Playlists
              </h3>
            </Link>

            <Link to="/recent" className="w-full">
              <h3 className="text-lg sm:text-xl bg-white text-black text-center font-bold px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                Recently Viewed Songs
              </h3>
            </Link>
          </motion.div>
        </div>

        {/* ✅ Logout Button */}
        <div className="mt-10 text-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="text-red-500 hover:underline text-sm"
          >
            Logout
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;

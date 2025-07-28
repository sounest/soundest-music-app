import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/Auth";
import { motion } from "framer-motion";
import { FaUserCircle, FaLock, FaSignOutAlt, FaTrashAlt } from "react-icons/fa";

const Settings = () => {
  const navigate = useNavigate();
  const { user, setUser1 } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "" });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleEditClick = () => setIsEditing(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
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
        toast.info("Email updated. Please verify your new email.");
      }

      setUser1(data);
      localStorage.setItem("user", JSON.stringify(data));
      setIsEditing(false);
    } catch (error) {
      console.error("Save Error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ✅ Delete Account Function
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not logged in");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/delete-account", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to delete account");
        return;
      }

      toast.success("Your account has been deleted");
      localStorage.clear();
      navigate("/register");
    } catch (error) {
      console.error("Delete Account Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white px-4 py-10 sm:px-8 lg:px-16">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* ✅ Title */}
        <h1 className="text-3xl font-bold text-blue-400 mb-8">⚙️ Settings</h1>

        {/* ✅ Profile Section */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-center gap-6 mb-8">
          <FaUserCircle size={80} className="text-gray-500" />
          <div className="text-center sm:text-left w-full">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none"
                />
                <button
                  onClick={handleSaveProfile}
                  className="mt-3 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-semibold transition"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{user?.username}</h2>
                <p className="text-gray-400 text-sm">{user?.email}</p>
                <button
                  onClick={handleEditClick}
                  className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-semibold transition"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>

        {/* ✅ Options */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col gap-6">
          {/* Change Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaLock className="text-yellow-400" />
              <p className="text-lg">Change Password</p>
            </div>
            <Link to="/forgot-password">
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-semibold transition">
                Change
              </button>
            </Link>
          </div>

          {/* Logout */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaSignOutAlt className="text-red-500" />
              <p className="text-lg">Logout</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-semibold transition"
            >
              Logout
            </button>
          </div>

          {/* ✅ Delete Account */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaTrashAlt className="text-pink-500" />
              <p className="text-lg">Delete Account</p>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-sm font-semibold transition"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Settings;

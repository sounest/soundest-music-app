import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FaUsers, FaMusic, FaUserTie, FaEnvelope } from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    songs: 0,
    users: 0,
    artists: 0,
    contacts: 0,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Simulate API stats fetch
    setStats({
      songs: 120,
      users: 540,
      artists: 32,
      contacts: 89,
    });
  }, []);

  return (
    <div className="flex h-full bg-black text-white">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 w-64 bg-[#1e1e1e] shadow-lg h-full z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        <div className="p-6 h-[550px]">
          <h1 className="text-3xl font-bold mb-8 text-red-500">Soundest</h1>
          <nav className="space-y-4">
            <Link
              to="/admin/dashboard"
              className="block py-3 px-4 rounded-lg hover:bg-red-500 hover:text-white transition"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/users"
              className="block py-3 px-4 rounded-lg hover:bg-red-500 hover:text-white transition"
            >
              Users
            </Link>
            <Link
              to="/admin/songs"
              className="block py-3 px-4 rounded-lg hover:bg-red-500 hover:text-white transition"
            >
              Songs
            </Link>
            <Link
              to="/admin/artists"
              className="block py-3 px-4 rounded-lg hover:bg-red-500 hover:text-white transition"
            >
              Artists
            </Link>
            <Link
              to="/admin/contacts"
              className="block py-3 px-4 rounded-lg hover:bg-red-500 hover:text-white transition"
            >
              Contacts
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-0 md:ml-64">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden mb-6 p-2 bg-red-500 text-white rounded-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          title={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          <FiMenu size={24} />
        </button>

        <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Songs */}
          <Link
            to="/admin/songs"
            className="bg-[#1e1e1e] p-6 rounded-xl shadow hover:shadow-xl hover:bg-red-600 transition transform hover:scale-105 flex flex-col items-center cursor-pointer"
          >
            <FaMusic className="text-white text-3xl mb-2" />
            <h2 className="text-gray-300 text-sm font-medium">Songs</h2>
            <p className="text-3xl font-bold text-white">{stats.songs}</p>
          </Link>

          {/* Users */}
          <Link
            to="/admin/users"
            className="bg-[#1e1e1e] p-6 rounded-xl shadow hover:shadow-xl hover:bg-green-600 transition transform hover:scale-105 flex flex-col items-center cursor-pointer"
          >
            <FaUsers className="text-white text-3xl mb-2" />
            <h2 className="text-gray-300 text-sm font-medium">Users</h2>
            <p className="text-3xl font-bold text-white">{stats.users}</p>
          </Link>

          {/* Artists */}
          <Link
            to="/admin/artists"
            className="bg-[#1e1e1e] p-6 rounded-xl shadow hover:shadow-xl hover:bg-purple-600 transition transform hover:scale-105 flex flex-col items-center cursor-pointer"
          >
            <FaUserTie className="text-white text-3xl mb-2" />
            <h2 className="text-gray-300 text-sm font-medium">Artists</h2>
            <p className="text-3xl font-bold text-white">{stats.artists}</p>
          </Link>

          {/* Contacts */}
          <Link
            to="/admin/contacts"
            className="bg-[#1e1e1e] p-6 rounded-xl shadow hover:shadow-xl hover:bg-blue-600 transition transform hover:scale-105 flex flex-col items-center cursor-pointer"
          >
            <FaEnvelope className="text-white text-3xl mb-2" />
            <h2 className="text-gray-300 text-sm font-medium">Contacts</h2>
            <p className="text-3xl font-bold text-white">{stats.contacts}</p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="mt-10 bg-[#1e1e1e] p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="divide-y divide-gray-700">
            <li className="py-3 flex justify-between text-gray-300">
              <span>New song uploaded</span>
              <span className="text-gray-500 text-sm">2 min ago</span>
            </li>
            <li className="py-3 flex justify-between text-gray-300">
              <span>User registered</span>
              <span className="text-gray-500 text-sm">10 min ago</span>
            </li>
            <li className="py-3 flex justify-between text-gray-300">
              <span>Artist approval pending</span>
              <span className="text-gray-500 text-sm">30 min ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { useAuth } from "../context/Auth";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import logo from "./1000081518-removebg-preview.png";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const [sidenav, setSidenav] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [query, setQuery] = useState("");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidenav = () => setSidenav(!sidenav);
  const closeSidenav = () => setSidenav(false);

  const handleLogout = () => {
    logout(["token", "user"]);
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    closeSidenav();

    switch (value) {
      case "profile":
        navigate("/userprofile");
        break;
      case "logout":
        handleLogout();
        break;
      case "setting":
        navigate("/setting");
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  const AccountSelect = () => (
    <select
      aria-label="Account options" // ✅ Accessible name added
      value={selectedOption}
      onChange={handleAccountChange}
      className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none border border-gray-600 hover:border-red-400 focus:border-red-500 transition duration-200 shadow-sm text-sm"
    >
      <option value="" disabled>
        Account
      </option>
      <option value="profile">👤 Profile</option>
      <option value="setting">⚙️ Settings</option>
      <option value="logout">🚪 Logout</option>
    </select>
  );

  return (
    <header className="bg-[#060a20] text-white px-4 py-3 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Soundest Logo"
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSubmit}
          className="hidden lg:flex flex-1 items-center bg-[#191717] rounded-xl overflow-hidden shadow-md mx-4"
        >
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs, artists..."
            className="flex-1 bg-[#0a0f2c] text-white text-sm px-4 py-3 outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            aria-label="Search" // ✅ Added for accessibility
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-3 font-medium hover:opacity-90 transition-all"
          >
            Search <CiSearch size={20} />
          </button>
        </form>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <nav>
            <ul className="flex gap-4 text-sm sm:text-base">
              <li>
                <Link to="/" className="hover:text-red-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/aboutus" className="hover:text-red-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/playlist" className="hover:text-red-300">
                  Playlist
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-red-300">
                  Contact
                </Link>
              </li>
              {user ? (
                <li>
                  <AccountSelect />
                </li>
              ) : (
                <li>
                  <Link to="/login">
                    <button
                      aria-label="Login" // ✅ Added
                      className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 transition text-sm"
                    >
                      Login
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          {sidenav ? (
            <RxCross1
              onClick={closeSidenav}
              aria-label="Close menu" // ✅ Accessible name
              className="cursor-pointer"
              size={28}
            />
          ) : (
            <HiOutlineBars3CenterLeft
              onClick={toggleSidenav}
              aria-label="Open menu" // ✅ Accessible name
              className="cursor-pointer"
              size={28}
            />
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <form
        onSubmit={handleSubmit}
        className="block lg:hidden mt-4 bg-black rounded-xl overflow-hidden shadow-md"
      >
        <div className="flex items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs, artists..."
            className="flex-1 bg-transparent text-white text-sm px-4 py-3 outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            aria-label="Search" // ✅ Added
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 font-medium hover:opacity-90 transition-all flex items-center gap-1"
          >
            <CiSearch size={18} />
          </button>
        </div>
      </form>

      {/* Mobile Sidenav */}
      <AnimatePresence>
        {sidenav && (
          <motion.nav
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-full h-full bg-black bg-opacity-95 shadow-lg p-6 flex flex-col gap-6 text-white z-50 overflow-y-auto"
          >
            <Link
              to="/"
              onClick={closeSidenav}
              className="flex justify-center mb-6"
            >
              <img
                src={logo}
                alt="Soundest Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>

            <ul className="flex flex-col gap-6 text-lg">
              {["Home", "About Us", "Playlist", "Contact"].map((item, i) => (
                <li key={i}>
                  <motion.div
                    whileHover={{ scale: 1.05, color: "#ef4444" }}
                    onClick={closeSidenav}
                  >
                    <Link
                      to={`/${
                        item === "Home" ? "" : item.toLowerCase().replace(/\s/g, "")
                      }`}
                    >
                      {item}
                    </Link>
                  </motion.div>
                </li>
              ))}

              {user ? (
                <li>
                  <AccountSelect />
                </li>
              ) : (
                <li>
                  <Link to="/login" onClick={closeSidenav}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      aria-label="Login" // ✅ Added
                      className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 transition text-sm mt-4"
                    >
                      Login
                    </motion.button>
                  </Link>
                </li>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

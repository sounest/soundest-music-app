import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";
import logo from "./1000081518-removebg-preview.png";

const Footer = () => {
  const linkClasses =
    "relative cursor-pointer text-gray-400 hover:text-white transition-colors " +
    "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-500 " +
    "hover:after:w-full after:transition-all after:duration-300";

  return (
    <footer className="bg-black text-white pt-12 pb-6 px-4 md:px-8 mt-1">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
        
        {/* Branding */}
        <div>
          <Link to="/" className="flex justify-center sm:justify-start mb-4">
            <img
              src={logo}
              alt="Soundest Logo"
              className="h-16 sm:h-20 md:h-24 w-auto object-contain"
            />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
            Your daily dose of music. Discover, stream, and vibe to the best
            tunes.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="font-semibold text-lg sm:text-xl mb-4">Explore</h3>
          <ul className="flex flex-col gap-3 font-medium text-sm sm:text-base">
            <li>
              <Link to="/" className={linkClasses}>Home</Link>
            </li>
            <li>
              <Link to="/aboutus" className={linkClasses}>About Us</Link>
            </li>
            <li>
              <Link to="/playlist" className={linkClasses}>Playlists</Link>
            </li>
            <li>
              <Link to="/login" className={linkClasses}>Sign In</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg sm:text-xl mb-4">Follow Us</h3>
          <ul className="flex justify-center sm:justify-start space-x-6 text-gray-400 text-2xl">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-pink-500 transition-colors"
              >
                <FaInstagram />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-blue-400 transition-colors"
              >
                <FaTwitter />
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-blue-600 transition-colors"
              >
                <FaFacebook />
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-red-500 transition-colors"
              >
                <FaYoutube />
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg sm:text-xl mb-4">Contact</h3>
          <ul className="flex flex-col gap-3 text-gray-400 text-sm sm:text-base font-medium">
            <li>
              Email: <span className="text-white">musicsoundest@gmail.com</span>
            </li>
            <li>
              <Link to="/contact" className={linkClasses}>
                Contact Form
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <p className="text-center text-gray-500 font-medium py-6 mb-[120px] md4:mb-[50px] mt-10 border-t border-gray-700 text-sm sm:text-base">
        &copy; {new Date().getFullYear()} Soundest. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

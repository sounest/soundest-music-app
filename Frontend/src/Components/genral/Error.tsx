import { Link } from "react-router-dom";
import logo from "../Header,Footer/1000081518-removebg-preview.png";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4 cursor-pointer">
      <div className="text-center">
        <img
          src={logo}
          alt="Soundest Logo"
          className="mx-auto mb-6 w-40 h-auto"
        />
        <h1 className="text-9xl font-bold text-red-600">404</h1>
        <h2 className="text-4xl mt-4 font-semibold">Page Not Found</h2>
        <p className="mt-2 text-gray-400">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-medium transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

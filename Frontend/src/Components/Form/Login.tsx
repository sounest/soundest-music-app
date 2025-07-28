import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/Auth";

const Login = () => {
  const navigate = useNavigate();
  const { storeTokenInLs, setUser1 } = useAuth();

  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });

  const [error, setError] = useState<Record<string, string>>({});
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showeye, setshoweye] = useState(false);

  const URL = "http://localhost:5000/api/auth/login";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newError: Record<string, string> = {};

    if (user.Email.trim() === "") {
      newError.Email = "Please enter email";
    } else if (!user.Email.includes("@") || user.Email.indexOf("@") <= 0) {
      newError.Email = "`@` is in an invalid position";
    } else if (!user.Email.endsWith(".com")) {
      newError.Email = "Email must end with `.com`";
    }

    if (user.Password === "") {
      newError.Password = "Please enter password";
    } else if (user.Password.length < 8) {
      newError.Password = "Enter more than 8 characters";
    }

    setError(newError);

    if (Object.keys(newError).length > 0) return;

    setFlag(true);
    setLoading(true);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.Email,
          password: user.Password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        storeTokenInLs("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("isLoggedIn", "true");
        setUser1(data);
        toast.success("Login successfully!");
        setTimeout(() => {
          setUser(data);
          navigate("/");
        }, 2000);
      } else {
        toast.error(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleshoweye = () => {
    setshoweye(!showeye);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="bg-[#1e1e1e] p-8 mb-[150px] rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login to Soundest
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {flag && (
            <p className="text-green-400 mt-4 text-center">
              Logged in successfully!
            </p>
          )}

          <div>
            <label className="block mb-1 ml-2 text-white">Email</label>
            <input
              name="Email"
              value={user.Email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 outline-none"
            />
            {error.Email && (
              <p className="text-red-400 text-sm mt-1">{error.Email}</p>
            )}
          </div>

          <div className="relative">
            <label className="block mb-1 ml-2 text-white">Password</label>
            <input
              name="Password"
              value={user.Password}
              onChange={handleChange}
              type={showeye ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 outline-none"
            />
            <div
              className="absolute top-10 right-3 text-white hover:text-gray-400 cursor-pointer"
              onClick={handleshoweye}
            >
              {showeye ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
            {error.Password && (
              <p className="text-red-400 text-sm mt-1">{error.Password}</p>
            )}
          </div>

          {/* 👇 Forgot Password Link */}
          <div className="text-right text-sm mb-2">
            <Link
              to="/forgot-password"
              className="text-red-400 hover:underline hover:text-red-300"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg font-semibold ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center mt-4 text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-400 hover:underline">
            Sign up
          </Link>
        </div>

        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default Login;

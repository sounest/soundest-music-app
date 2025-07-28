import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Loginartist = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ Email: "", Password: "" });
  const [error, setError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showeye, setshoweye] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newError: Record<string, string> = {};

    if (user.Email.trim() === "") newError.Email = "Please enter email";
    else if (!user.Email.includes("@")) newError.Email = "Invalid email";
    else if (!user.Email.endsWith(".com")) newError.Email = "Email must end with .com";

    if (user.Password.trim() === "") newError.Password = "Please enter password";
    else if (user.Password.length < 8) newError.Password = "Minimum 8 characters";

    setError(newError);
    if (Object.keys(newError).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/artist/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.Email, password: user.Password }),
      });

      const data = await res.json();

      if (res.ok && data.artist?.isartist) {
        toast.success("Login successful!");
        localStorage.setItem("artist", JSON.stringify(data.artist));

        setTimeout(() => {
          navigate("/artistprofile");
        }, 2000);
      } else {
        if (res.status === 403) {
          toast.info(data.message || "Your account is pending approval.");
        } else {
          toast.error(data.message || "Login failed");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="bg-[#1e1e1e] p-8 mb-[150px] rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login to <span className="text-[#60ff60] text-4xl">artist</span>
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            {error.Email && <p className="text-red-400 text-sm mt-1">{error.Email}</p>}
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
              onClick={() => setshoweye(!showeye)}
            >
              {showeye ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
            {error.Password && <p className="text-red-400 text-sm mt-1">{error.Password}</p>}
          </div>

          <button
            type="submit"
            className={`flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg font-semibold ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <ToastContainer />

        <div className="text-center mt-4 text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link to="/signinartist" className="text-red-400 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Loginartist;

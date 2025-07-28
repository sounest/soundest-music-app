import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    Username: "",
    Email: "",
    mob: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [error, setError] = useState<Record<string, string>>({});
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showqestion, setshowqestion] = useState(false);
  const [showeye, setshoweye] = useState(false);
  const [showeye1, setshoweye1] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newError: Record<string, string> = {};

    // Validation
    if (user.Username.trim() === "") newError.Username = "Please enter username";
    else if (user.Username.length < 2) newError.Username = "Enter at least 2 characters";

    if (user.Email.trim() === "") newError.Email = "Please enter email";
    else if (!user.Email.includes("@") || user.Email.indexOf("@") <= 0)
      newError.Email = "`@` is in an invalid position";
    else if (!user.Email.endsWith(".com")) newError.Email = "Email must end with `.com`";

    if (user.mob.trim() === "") newError.mob = "Please enter mobile number";
    else if (!/^\d{10}$/.test(user.mob)) newError.mob = "Please enter a 10-digit number";

    if (user.Password === "") newError.Password = "Please enter password";
    else if (user.Password.length < 8) newError.Password = "Enter more than 8 characters";

    if (user.ConfirmPassword === "") newError.ConfirmPassword = "Please confirm your password";
    else if (user.Password !== user.ConfirmPassword)
      newError.ConfirmPassword = "Passwords do not match";

    setError(newError);
    if (Object.keys(newError).length > 0) return;

    setFlag(true);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.Username,
          email: user.Email,
          phone: user.mob,
          password: user.Password,
        }),
      });

      const data = await response.json();
      console.log("Register response:", data);

      if (response.ok) {
        toast.success("Registered successfully!");
        setTimeout(() => {
          setLoading(false);
          setshowqestion(true);
          navigate("/Emailotp");
        }, 2000);
      } else {
        toast.error(data.message || "Registration failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
      setLoading(false);
    }
  };

  const handleshoweye = () => setshoweye(!showeye);
  const handleshoweye1 = () => setshoweye1(!showeye1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="bg-[#1e1e1e] p-8 mt-10 rounded-xl mb-[150px] shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create your Soundest account
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {flag && !showqestion && (
            <p className="text-green-400 mt-4 text-center">Account created successfully!</p>
          )}

          <div>
            <label className="block mb-1 ml-2 text-white">Name</label>
            <input
              name="Username"
              value={user.Username}
              onChange={handleChange}
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 outline-none"
            />
            {error.Username && <p className="text-red-400 text-sm mt-1">{error.Username}</p>}
          </div>

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

          <div>
            <label className="block mb-1 ml-2 text-white">Mobile</label>
            <input
              name="mob"
              value={user.mob}
              onChange={handleChange}
              type="text"
              placeholder="Mobile Number"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 outline-none"
            />
            {error.mob && <p className="text-red-400 text-sm mt-1">{error.mob}</p>}
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
            {error.Password && <p className="text-red-400 text-sm mt-1">{error.Password}</p>}
          </div>

          <div className="relative">
            <label className="block mb-1 ml-2 text-white">Re-enter password</label>
            <input
              name="ConfirmPassword"
              value={user.ConfirmPassword}
              onChange={handleChange}
              type={showeye1 ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 outline-none"
            />
            <div
              className="absolute top-10 right-3 text-white hover:text-gray-400 cursor-pointer"
              onClick={handleshoweye1}
            >
              {showeye1 ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
            {error.ConfirmPassword && (
              <p className="text-red-400 text-sm mt-1">{error.ConfirmPassword}</p>
            )}
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
              "Sign Up"
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-red-400 hover:underline">
            Login
          </Link>
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Signin;

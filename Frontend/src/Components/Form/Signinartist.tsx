import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signinartist = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    Username: "",
    Email: "",
    phone: "",
    Password: "",
    ConfirmPassword: "",
    cover: null as File | null,
  });

  const [error, setError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showeye, setShoweye] = useState(false);
  const [showeye1, setShoweye1] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name === "cover") {
      const file = e.target.files ? e.target.files[0] : null;
      setUser({ ...user, cover: file });
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setUser({ ...user, [name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newError: Record<string, string> = {};

    if (user.Username.trim() === "")
      newError.Username = "Please enter username";
    else if (user.Username.length < 2)
      newError.Username = "Enter at least 2 characters";

    if (user.Email.trim() === "") newError.Email = "Please enter email";
    else if (!user.Email.includes("@") || user.Email.indexOf("@") <= 0)
      newError.Email = "`@` is in an invalid position";
    else if (!user.Email.endsWith(".com"))
      newError.Email = "Email must end with `.com`";

    if (user.phone.trim() === "") newError.phone = "Please enter mobile number";
    else if (!/^\d{10}$/.test(user.phone))
      newError.phone = "Please enter a 10-digit number";

    if (!user.cover) newError.cover = "Please select a cover image";

    if (user.Password === "") newError.Password = "Please enter password";
    else if (user.Password.length < 8)
      newError.Password = "Enter more than 8 characters";

    if (user.ConfirmPassword === "")
      newError.ConfirmPassword = "Please confirm your password";
    else if (user.Password !== user.ConfirmPassword)
      newError.ConfirmPassword = "Passwords do not match";

    setError(newError);
    if (Object.keys(newError).length > 0) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", user.Username);
      formData.append("email", user.Email);
      formData.append("phone", user.phone);
      formData.append("password", user.Password);
      if (user.cover) formData.append("cover", user.cover);

      const response = await fetch(
        "http://localhost:5000/api/artist/register",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Register response:", data);

      if (response.ok) {
        toast.success("Artist registered successfully!");
        setTimeout(() => {
          navigate("/loginartist");
        }, 2000);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 px-4 py-10">
      <div className="bg-[#1e1e1e] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create your <span className="text-[#60ff60] text-4xl">artist</span>{" "}
          account
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 ml-2 text-white">Username</label>
            <input
              name="Username"
              value={user.Username}
              onChange={handleChange}
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 outline-none"
            />
            {error.Username && (
              <p className="text-red-400 text-sm mt-1">{error.Username}</p>
            )}
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
            {error.Email && (
              <p className="text-red-400 text-sm mt-1">{error.Email}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 ml-2 text-white">Mobile</label>
            <input
              name="phone"
              value={user.phone}
              onChange={handleChange}
              type="text"
              placeholder="Mobile Number"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 outline-none"
            />
            {error.phone && (
              <p className="text-red-400 text-sm mt-1">{error.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="cover" className="block mb-1 ml-2 text-white">
              Upload Cover Image
            </label>
            <input
              id="cover"
              name="cover"
              onChange={handleChange}
              type="file"
              accept="image/*"
              className="hidden"
            />
            <label
              htmlFor="cover"
              className="bg-gradient-to-r from-blue-400 to-green-300 text-black px-4 py-2 rounded-lg cursor-pointer inline-block"
            >
              Choose File
            </label>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 rounded-lg w-24 h-24"
              />
            )}
            {error.cover && (
              <p className="text-red-400 text-sm mt-1">{error.cover}</p>
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
              onClick={() => setShoweye(!showeye)}
            >
              {showeye ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
            {error.Password && (
              <p className="text-red-400 text-sm mt-1">{error.Password}</p>
            )}
          </div>

          <div className="relative">
            <label className="block mb-1 ml-2 text-white">
              Confirm Password
            </label>
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
              onClick={() => setShoweye1(!showeye1)}
            >
              {showeye1 ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
            {error.ConfirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {error.ConfirmPassword}
              </p>
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
              "Create"
            )}
          </button>
        </form>

        <ToastContainer />

        <div className="text-center mt-4 text-gray-400 text-sm">
          Already have an artist account?{" "}
          <Link to="/loginartist" className="text-red-400 hover:underline">
            Login artist
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signinartist;

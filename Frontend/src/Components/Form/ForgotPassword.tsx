import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      toast.success(response.data.message || "OTP sent to your email");

      // Redirect to reset password after a short delay
      setTimeout(() => {
        navigate("/reset-password");
      }, 2000);
   } catch (err: unknown) {
  if (err instanceof Error) {
    toast.error(err.message);
  } else if (typeof err === "object" && err && "response" in err) {
    const axiosError = err as { response?: { data?: { message?: string } } };
    toast.error(axiosError.response?.data?.message || "Something went wrong");
  } else {
    toast.error("Something went wrong");
  }
}
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="bg-[#1e1e1e] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Forgot Password
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleForgotPassword}>
          <div>
            <label className="block mb-1 ml-2 text-white">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 outline-none"
              required
            />
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
              "Send OTP"
            )}
          </button>
        </form>

        <div className="text-center mt-4 text-gray-400 text-sm">
          Remembered your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-400 hover:underline cursor-pointer"
          >
            Login
          </span>
        </div>

        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default ForgotPassword;

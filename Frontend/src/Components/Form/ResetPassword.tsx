import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Password Validation
    if (newPassword === "") {
      toast.error("Please enter password");
      setLoading(false);
      return;
    } else if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      toast.success(response.data.message || "Password reset successfully!");
      setTimeout(() => {
        navigate("/login");
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
     };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="bg-[#1e1e1e] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Reset Password
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
          {/* Email Input */}
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

          {/* OTP Input */}
          <div className="relative">
            <label className="block mb-1 ml-2 text-white">OTP</label>
            <input
              type={showOtp ? "text" : "password"}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 outline-none"
              required
            />
            <div
              className="absolute top-10 right-3 text-white hover:text-gray-400 cursor-pointer"
              onClick={() => setShowOtp(!showOtp)}
            >
              {showOtp ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block mb-1 ml-2 text-white">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 outline-none"
              required
            />
            <div
              className="absolute top-10 right-3 text-white hover:text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg font-semibold ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <div className="text-center mt-4 text-gray-400 text-sm">
          Back to{" "}
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

export default ResetPassword;

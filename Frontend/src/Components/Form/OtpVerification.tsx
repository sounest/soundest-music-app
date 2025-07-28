import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ otp: "" });
  const email = localStorage.getItem("verifyEmail") || "";
  const [timer, setTimer] = useState(300); // ⏱️ 5 minutes in seconds
  const [resending, setResending] = useState(false);

  // ⏱️ Countdown timer logic
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/verifyemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: user.otp }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Email verified successfully");
        localStorage.removeItem("verifyEmail");
        setTimeout(() => navigate("/login"), 5000);
      } else {
        toast.error(data.message || "Invalid or expired OTP");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    if (!email) return toast.error("Email not found. Please register again.");

    setResending(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/resendOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setTimer(300); // ⏱️ Restart timer
      } else {
        toast.error(data.message);
      }
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
      <div className="bg-[#1e1e1e] p-8 mb-[150px] rounded-xl shadow-lg w-full max-w-md">
        <p className="text-gray-400 text-sm mb-3 text-center">
          We've sent a code to your email address.
        </p>
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Verify Your Email
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={user.otp}
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400
             outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-900
             transition duration-300"
          />

          <div className="text-sm text-center text-gray-400">
            OTP expires in:{" "}
            <span className="text-white font-semibold">{formatTime(timer)}</span>
          </div>

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={timer > 0 || resending}
            className={`text-blue-400 underline text-sm ${
              timer > 0 || resending ? "opacity-40 cursor-not-allowed" : "hover:text-blue-600"
            }`}
          >
            Resend OTP
          </button>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Verify
          </button>
        </form>

        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default VerifyOtp;

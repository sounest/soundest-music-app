import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Contact = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    feedback: "",
  });

  const URL = "http://localhost:5000/api/contact/contact";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        message: user.feedback,
      }),
    });

    if (response.ok) {
      alert("Message sent successfully");
      setUser({
        username: "",
        email: "",
        feedback: "",
      });
      navigate("/");
    } else {
      const errorResponse = await response.text(); // Get the error message from the response
      console.error('Error response:', errorResponse);
      alert("Failed to send message");
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert("An error occurred while submitting the message.");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900 p-4 sm:p-6">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#121824] rounded-2xl p-8 shadow-2xl space-y-6 border border-blue-800"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-500 tracking-tight">
          Contact Soundest
        </h2>
        <p className="text-center text-gray-400 text-sm sm:text-base">
          Have questions, suggestions, or feedback? We'd love to hear from you!
        </p>

        <div>
          <label className="block mb-2 text-sm text-gray-300">Username</label>
          <input
            name="username"
            type="text"
            value={user.username}
            onChange={handleChange}
            placeholder="Your username"
            className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300">Registered Email</label>
          <input
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300">Message</label>
          <textarea
            name="feedback"
            value={user.feedback}
            onChange={handleChange}
            placeholder="What's on your mind?"
            rows={5}
            className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-none"
            required
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg"
        >
          Send Message
        </motion.button>

        <div className="mt-6 text-center text-sm text-gray-400">
          Or email us directly at{" "}
          <a
            href="mailto:support@soundest.app"
            className="text-blue-400 hover:underline"
          >
            support@soundest.app
          </a>
        </div>
      </motion.form>
    </div>
  );
};

export default Contact;

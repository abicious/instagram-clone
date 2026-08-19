import React, { useState } from "react";

export default function Signup({ onSwitch }) {
  const [formData, setFormData] = useState({
    contact: "",
    password: "",
    month: "",
    day: "",
    year: "",
    fullName: "",
    username: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://instagram-backend-olive.vercel.app/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }), // or whatever fields your API expects
        },
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Account created successfully! Switching to login...");
        setTimeout(() => onSwitch(), 1500);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Failed to connect to server");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#1c1c1c] p-8 rounded-xl border border-[#2a2a2a]">
        <div className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-1">
          ∞ Meta
        </div>
        <h2 className="text-xl font-bold mb-1">
          Get started on Instagram with a Meta Account
        </h2>
        <p className="text-xs text-gray-400 mb-6">
          A Meta Account lets you access multiple Meta technologies, like
          Instagram, easily and securely.
        </p>

        {message && <p className="text-sm text-blue-400 mb-4">{message}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-300 font-medium mb-1">
              Mobile number or email
            </label>
            <input
              type="text"
              name="contact"
              placeholder="Mobile number or email"
              onChange={handleChange}
              className="w-full bg-[#262626] border border-[#363636] rounded-md px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-300 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full bg-[#262626] border border-[#363636] rounded-md px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-300 font-medium mb-1">
              Birthday
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                name="month"
                onChange={handleChange}
                className="bg-[#262626] border border-[#363636] rounded-md px-2 py-2 text-xs text-white"
              >
                <option value="">Month</option>
                <option value="Jan">Jan</option>
                <option value="Feb">Feb</option>
                <option value="Mar">Mar</option>
              </select>
              <select
                name="day"
                onChange={handleChange}
                className="bg-[#262626] border border-[#363636] rounded-md px-2 py-2 text-xs text-white"
              >
                <option value="">Day</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              <select
                name="year"
                onChange={handleChange}
                className="bg-[#262626] border border-[#363636] rounded-md px-2 py-2 text-xs text-white"
              >
                <option value="">Year</option>
                <option value="2000">2000</option>
                <option value="2001">2001</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-300 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              onChange={handleChange}
              className="w-full bg-[#262626] border border-[#363636] rounded-md px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-300 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full bg-[#262626] border border-[#363636] rounded-md px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0064e0] hover:bg-[#0052b8] text-white font-medium py-2 rounded-lg text-sm transition"
          >
            Submit
          </button>
        </form>

        <button
          onClick={onSwitch}
          className="w-full mt-3 bg-[#262626] hover:bg-[#333] text-white text-sm font-medium py-2 rounded-lg border border-[#363636]"
        >
          I already have an account
        </button>
      </div>
    </div>
  );
}

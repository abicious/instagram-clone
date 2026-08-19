import React, { useState } from "react";

export default function Login({ onSwitch }) {
  const [loginKey, setLoginKey] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginKey, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage(`Logged in as @${data.user.username}`);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Failed to connect to backend server");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col md:flex-row items-center justify-center p-6">
      {/* Left side banner */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mb-8 md:mb-0">
        <div className="w-12 h-12 mb-4 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-xl p-[2px]">
          <div className="w-full h-full bg-[#121212] rounded-[10px] flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          See everyday moments from your{" "}
          <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            close friends
          </span>
          .
        </h1>
      </div>

      {/* Right side login form */}
      <div className="w-full max-w-md bg-[#1c1c1c] p-8 rounded-xl border border-[#2a2a2a]">
        <h2 className="text-xl font-medium mb-6">Log into Instagram</h2>
        {message && <p className="text-sm text-red-400 mb-4">{message}</p>}

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="text"
            placeholder="Mobile number, username or email"
            value={loginKey}
            onChange={(e) => setLoginKey(e.target.value)}
            className="w-full bg-[#262626] border border-[#363636] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#262626] border border-[#363636] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-gray-500"
          />
          <button
            type="submit"
            className="w-full bg-[#0064e0] hover:bg-[#0052b8] text-white font-medium py-2 rounded-lg text-sm mt-2 transition"
          >
            Log in
          </button>
        </form>

        <div className="text-center my-4">
          <a href="#" className="text-xs text-gray-400 hover:underline">
            Forgot password?
          </a>
        </div>

        <div className="space-y-3 pt-2">
          <button className="w-full bg-[#262626] hover:bg-[#333] text-white text-sm font-medium py-2 rounded-lg border border-[#363636]">
            Log in with Facebook
          </button>
          <button
            onClick={onSwitch}
            className="w-full bg-transparent hover:bg-[#262626] text-[#0095f6] border border-[#0095f6] text-sm font-medium py-2 rounded-lg transition"
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
}

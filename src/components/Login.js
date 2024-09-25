// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Sample user data (you might fetch this from a database in a real app)
const validUsers = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "admin", password: "admin123" },
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (username === "" || password === "") {
      setError("Both fields are required.");
      return;
    }

    // Simulate a login process
    setLoading(true);

    // Check if the username and password match
    const user = validUsers.find(
      (user) => user.username === username && user.password === password
    );

    setTimeout(() => {
      if (user) {
        // Login successful
        localStorage.setItem("username", username);
        navigate("/home");
      } else {
        // Login failed
        setError("Invalid username or password.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-blue-600"
            } text-white font-semibold py-2 rounded hover:bg-blue-700`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const username = localStorage.getItem("username");

  return (
    <nav className="bg-blue-600 w-full p-4">
      <div className="flex justify-between">
        <div className="flex space-x-8">
          <div>
            <Link to="/home" className="text-white">
              Home
            </Link>
          </div>
          <div>
            <Link to="/dashboard" className="text-white">
              Employee List
            </Link>
          </div>
        </div>
        <div>
          <Link
            to="/"
            onClick={() => localStorage.removeItem("username")}
            className="text-white"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// src/components/Home.js
import React from "react";
import Navbar from "./Navbar"; // Import the Navbar component

const Home = () => {
  const username = localStorage.getItem("username");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <h1 className="text-4xl font-bold mt-10">
          Welcome to the Admin Panel, {username}!
        </h1>
      </div>
    </div>
  );
};

export default Home;

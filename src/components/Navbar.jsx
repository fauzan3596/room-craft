import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/room-craft-logo.png" className="h-10 w-" />
        <h1 className="text-xl font-bold">RoomCraft</h1>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center space-x-6 text-gray-500">
        <li>
          <Link to="/user" className="hover:text-black">
            Home
          </Link>
        </li>
        <li>
          <Link to="/user/furniture" className="hover:text-black">
            Furnitures
          </Link>
        </li>
        <li>
          <Link to="/user/room" className="hover:text-black">
            Rooms
          </Link>
        </li>
        <li>
          <Link to="" className="hover:text-black">
            Favorite
          </Link>
        </li>
      </ul>

      {/* Login Button */}
      <button
        onClick={handleLoginClick}
        className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
      >
        Login
      </button>
    </nav>
  );
};

export default Navbar;

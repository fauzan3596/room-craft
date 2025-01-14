import React from "react";
import roomCraftLogo from "/room-craft-logo.png";
import {
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Database,
  Users2,
} from "lucide-react";

const Navbar = ({ isNavbarOpen, setIsNavbarOpen }) => {
  return (
    <nav
      className={`${
        isNavbarOpen ? "w-64" : "w-20"
      } bg-white fixed transition-all duration-300 ease-in-out h-screen z-50 shadow-xl`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 mt-1">
            <img
              src={roomCraftLogo}
              alt="RoomCraft Logo"
              className={`${
                isNavbarOpen ? "h-9 w-9" : "h-7 w-7"
              } transition-all duration-300`}
            />
            {isNavbarOpen && (
              <span className="text-green-900 text-xl font-semibold">
                RoomCraft
              </span>
            )}
          </div>
          <button
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
            className="text-green-900 hover:text-green-800"
          >
            <ChevronDown
              className={`h-5 w-5 transform ${
                isNavbarOpen ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
        </div>
      </div>

      <ul className={`mt-8 ${isNavbarOpen ? "px-5" : "px-3"}`}>
        <li className="flex items-center px-4 py-3 text-green-900 hover:bg-[#ffebed] cursor-pointer rounded-btn">
          <LayoutDashboard className="h-5 w-5" />
          {isNavbarOpen && <span className="ml-3">Dashboard</span>}
        </li>
        <li className="flex items-center px-4 py-3 text-green-900 hover:bg-[#ffebed] cursor-pointer rounded-btn">
          <Database className="h-5 w-5" />
          {isNavbarOpen && <span className="ml-3">Master Data</span>}
        </li>
        <li className="flex items-center px-4 py-3 text-green-900 hover:bg-[#ffebed] cursor-pointer rounded-btn">
          <Users2 className="h-5 w-5" />
          {isNavbarOpen && <span className="ml-3">User Data</span>}
        </li>
        <li className="flex items-center px-4 py-3 text-green-900 hover:bg-[#ffebed] cursor-pointer rounded-btn">
          <LogOut className="h-5 w-5" />
          {isNavbarOpen && <span className="ml-3">Log Out</span>}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

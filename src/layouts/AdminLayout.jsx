import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

const AdminLayout = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const displayWindowSize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", displayWindowSize);
    return () => window.removeEventListener("resize", displayWindowSize);
  }, []);

  useEffect(() => {
    if (screenWidth < 1024) {
      setIsNavbarOpen(false);
    } else {
      setIsNavbarOpen(true);
    }
  }, [screenWidth]);

  return (
    <div className="flex">
      <Navbar isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />

      <div
        className={`${
          isNavbarOpen && "lg:ps-64 ps-20"
        } ps-20 min-h-screen w-full transition-all duration-300 ease-in-out bg-[#ffebed]`}
      >
        {isNavbarOpen && screenWidth < 1024 && (
          <div
            className="inset-0 bg-black bg-opacity-30 transition-opacity z-20 h-screen w-full fixed"
            onClick={() => setIsNavbarOpen(false)}
          ></div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
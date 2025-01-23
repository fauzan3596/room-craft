import React from "react";
import headerImage from "../../../assets/download.png";
import { Box, Hammer, Palette } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#FDF3EE] lg:px-10 px-5 py-10">
      <div className="flex flex-col md:flex-row h-full justify-center items-center md:gap-5 gap-10">
        <div className="flex-[0.5] flex flex-col gap-5">
          <h1 className="md:text-6xl text-4xl">Discover Your Perfect Room</h1>
          <p className="font-medium md:text-xl text-base text-[#979294]">
            RoomCraft is a revolutionary 3D product showcase that empowers users
            to easily design their perfect room layouts in real-time
          </p>
          <Link to="/user/room">
            <button className="btn bg-green-900 hover:bg-green-700 text-white rounded-badge md:w-1/3 md:mt-5">
              Get Started
            </button>
          </Link>
        </div>
        <div className="flex-[0.5] flex justify-center">
          <img
            src={headerImage}
            alt="Header Image"
            className="w-[30rem] md:h-96 md:w-96 lg:h-[30rem] lg:w-auto"
          />
        </div>
      </div>
      <div className="mt-10 grid md:grid-cols-3 grid-cols-1 gap-5">
        <div className="card bg-white">
          <div className="card-body items-center text-center">
            <Box className="h-10 w-10" />
            <h2 className="card-title">Explore Our 3D Furnitures</h2>
            <p className="text-[#AEACAF]">
              Experience seamless room design with our cutting-edge 3D
              technology
            </p>
          </div>
        </div>
        <div className="card bg-white">
          <div className="card-body items-center text-center">
            <Hammer className="h-10 w-10" />
            <h2 className="card-title">Personalize Your Space</h2>
            <p className="text-[#AEACAF]">
              Unlock a world of design possibilities with RoomCraft's intuitive
              3D room maker
            </p>
          </div>
        </div>
        <div className="card bg-white">
          <div className="card-body items-center text-center">
            <Palette className="h-10 w-10" />
            <h2 className="card-title">Customize with Ease</h2>
            <p className="text-[#AEACAF]">
              Elevate your home decor with our extensive collection of
              high-quality 3D furnishings and accessories
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

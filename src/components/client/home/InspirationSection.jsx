import React from "react";
import bedroomImage from "../../../assets/bedroom.png";
import livingRoomImage from "../../../assets/livingroom.png";

const InspirationSection = () => {
  return (
    <section className="bg-[#FDF3EE] lg:px-10 px-5 py-10">
      <div className="flex flex-col md:flex-row h-full justify-center items-center md:gap-5 gap-10">
        <div className="flex-[0.6] flex justify-center">
          <img
            src={bedroomImage}
            alt="Bedroom Image"
            className="lg:h-[30rem] lg:w-auto"
          />
        </div>
        <div className="flex-[0.4] flex flex-col gap-5">
          <h1 className="md:text-4xl text-3xl font-semibold">
            Bedroom Inspiration
          </h1>
          <p className="font-medium text-base text-[#979294]">
            Discover the perfect balance of style and function for your bedroom
            with our 3D Room Maker. Customize your dream space by selecting from
            our curated collection of furniture and accessories
          </p>
        </div>
      </div>
      <div className="divider text-opacity-0 text-[#FDF3EE]">|||||||||</div>
      <div className="flex flex-col md:flex-row h-full justify-center items-center md:gap-5 gap-10 mt-4">
        <div className="flex-[0.4] flex flex-col gap-5">
          <h1 className="md:text-4xl text-3xl font-semibold">
            Living Room Inspiration
          </h1>
          <p className="font-medium text-base text-[#979294]">
            Transform your living room into a cozy and welcoming haven with our
            3D Room Maker. Easily experiment with furniture arrangements, color
            palettes, and decor to create a space that reflects your personal
            style
          </p>
        </div>
        <div className="flex-[0.6] flex justify-center">
          <img
            src={livingRoomImage}
            alt="Living Room Image"
            className="lg:h-[30rem] lg:w-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default InspirationSection;

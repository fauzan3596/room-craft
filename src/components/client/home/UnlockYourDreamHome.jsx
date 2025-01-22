import React from "react";
import roomImage from "../../../assets/download2.png";

const UnlockYourDreamHome = () => {
  return (
    <section className="bg-[#FFFAF5] lg:px-10 px-5 py-10">
      <div className="flex flex-col md:flex-row h-full justify-center items-center md:gap-5 gap-10">
        <div className="flex-[0.5] flex justify-center">
          <img
            src={roomImage}
            alt="Room Image"
            className="w-[30rem] md:h-96 md:w-96 lg:h-[30rem] lg:w-auto"
          />
        </div>
        <div className="flex-[0.5] flex flex-col gap-5">
          <h1 className="md:text-5xl text-4xl">Unlock Your Dream Home</h1>
          <p className="font-medium text-base text-[#979294]">
            Experience the power of our 3D Room Maker to effortlessly design the
            room of your dreams. Explore our curated collection of high-quality
            furniture and accessories to find the perfect pieces that complement
            your style and transform your living space
          </p>
          <div className="flex mt-2 gap-5 md:flex-row flex-col">
            <button className="btn bg-green-900 hover:bg-green-600 text-white rounded-badge md:w-1/3 ">
              Explore Now
            </button>
            <button className="btn btn-outline text-[#F8AAA1] hover:bg-[#F8AAA1] hover:text-white hover:border-[#F8AAA1] rounded-badge md:w-1/3">
              Start Designing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnlockYourDreamHome;

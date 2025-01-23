import React from "react";
import { useSelector } from "react-redux";
import TemplateCollectionCard from "./TemplateCollectionCard";

const TemplateCollection = () => {
  const { roomTemplates } = useSelector((state) => state.roomTemplates);

  return (
    <section className="bg-[#FFE8E2] lg:px-10 px-5 py-10">
      <div className="text-center">
        <h2 className="font-semibold md:text-[2.5rem] text-3xl">
          Space Planning Made Easy
        </h2>
        <p className="text-[#746461] text-lg md:w-[34rem] mx-auto mt-4">
          Discover our comprehensive range of room templates, designed to
          simplify your space planning process and bring your vision to life
        </p>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 sm:gap-4 gap-6 mt-8">
        {roomTemplates.slice(0, 3).map((room) => (
          <TemplateCollectionCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
};

export default TemplateCollection;

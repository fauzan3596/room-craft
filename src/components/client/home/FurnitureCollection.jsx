import React from "react";
import { useSelector } from "react-redux";
import FurnitureCollectionCard from "./FurnitureCollectionCard";

const FurnitureCollection = () => {
  const { furnitures } = useSelector((state) => state.furnitures);

  return (
    <section className="bg-[#FFE8E2] lg:px-10 px-5 py-10">
      <div className="text-center">
        <h2 className="font-semibold md:text-[2.5rem] text-3xl">
          Furniture Collections for Every Style
        </h2>
        <p className="text-[#746461] text-lg sm:w-[30rem] mx-auto mt-4">
          Discover a vast selection of high-quality furniture and accessories to
          transform any room
        </p>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-6 mt-8">
        {furnitures.slice(0, 4).map((furniture) => (
          <FurnitureCollectionCard key={furniture.id} furniture={furniture} />
        ))}
      </div>
    </section>
  );
};

export default FurnitureCollection;

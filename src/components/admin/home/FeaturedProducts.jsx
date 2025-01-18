import React from "react";
import { useSelector } from "react-redux";
import FeaturedCard from "./FeaturedCard";

const FeaturedProducts = () => {
  const { furnitures } = useSelector((state) => state.furnitures);

  const sortedFurnitures = [...furnitures].sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  return (
    <section className="mt-5">
      <h2 className="text-green-900 text-xl font-medium">Featured Products</h2>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-3 gap-y-8 mt-3">
        {sortedFurnitures.slice(0, 3).map((furniture) => (
          <FeaturedCard key={furniture.id} furniture={furniture} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;

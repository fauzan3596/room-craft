import React from "react";
import ProductDataCard from "./ProductDataCard";

const CardData = ({ furnitures }) => {
  return (
    <section className="mt-5">
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-3 gap-y-8">
        {furnitures.map((furniture) => (
          <ProductDataCard key={furniture.id} furniture={furniture} />
        ))}
      </div>
    </section>
  );
};

export default CardData;

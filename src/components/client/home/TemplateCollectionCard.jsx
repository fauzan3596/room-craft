import React from "react";
import CardCanvas from "../room/CardCanvas";

const TemplateCollectionCard = ({ room }) => {
  const {
    name,
    length,
    width,
    height,
    wallColor,
    textureFloors,
    textureWalls,
    description,
    category,
    furnitures,
  } = room;

  return (
    <div className="card bg-white shadow-xl">
      <figure className="lg:h-80 md:h-48 h-60">
        <CardCanvas
          length={length}
          width={width}
          height={height}
          wallColor={wallColor}
          furnitures={furnitures}
          textureFloors={textureFloors}
          textureWalls={textureWalls}
        />
      </figure>
      <div className="card-body">
        <div>
          <p className="text-[#A1824A] md:text-base text-sm">{category}</p>
          <h2 className="card-title">{name}</h2>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default TemplateCollectionCard;

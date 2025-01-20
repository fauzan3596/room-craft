import React from "react";
import { useSelector } from "react-redux";
import FurnitureCardRoom from "./FurnitureCardRoom";

const AllFurnitureList = ({roomId}) => {
  const { furnitures } = useSelector((state) => state.furnitures);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {furnitures.map((furniture) => (
        <FurnitureCardRoom furniture={furniture} roomId={roomId} key={furniture.id} />
      ))}
    </section>
  );
};

export default AllFurnitureList;

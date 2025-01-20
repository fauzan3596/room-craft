import React from "react";
import FurnitureCardRoom from "./FurnitureCardRoom";
import { useSelector } from "react-redux";

const FavoriteFurnitureList = ({ roomId }) => {
  const { favoriteFurnitures } = useSelector(
    (state) => state.favoriteFurnitures
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {favoriteFurnitures.map((furniture) => (
        <FurnitureCardRoom
          furniture={furniture}
          roomId={roomId}
          key={furniture.id}
        />
      ))}
    </section>
  );
};

export default FavoriteFurnitureList;

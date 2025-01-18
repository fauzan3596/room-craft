import React from "react";

const RoomCard = ({ room }) => {
  const { name, category, length, width, height, furnitures } = room;

  const listFurnitures = new Map();
  furnitures.forEach((furniture) => {
    if (listFurnitures.has(furniture.name)) {
      listFurnitures.set(
        furniture.name,
        listFurnitures.get(furniture.name) + 1
      );
    } else {
      listFurnitures.set(furniture.name, 1);
    }
  });

  return (
    <section className="card sm:card-side">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt="Movie"
        />
      </figure>
      <div className="card-body text-[#A1824A]">
        <h2 className="card-title text-black">{name}</h2>
        <p>{category}</p>
        <div>
          <p>Dimensions:</p>
          <p>
            {length}m &times; {width}m &times; {height}m
          </p>
        </div>
        <div>
          <p>Furnitures List:</p>
          <div className="flex flex-wrap capitalize">
            {Array.from(listFurnitures).map(([furnitureName, count]) => (
              <div key={furnitureName} className="me-2">
                {furnitureName} &times; {count}
              </div>
            ))}
          </div>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Watch</button>
        </div>
      </div>
    </section>
  );
};

export default RoomCard;

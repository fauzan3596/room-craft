import React from "react";
import CardModel from "./CardCanvas";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  const { id, name, category, length, width, height, furnitures, wallColor } =
    room;

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
    <section className="card lg:card-side hover:border hover:shadow-xl">
      <figure className="lg:w-1/4">
        <CardModel
          length={length}
          width={width}
          height={height}
          wallColor={wallColor}
        />
      </figure>
      <div className="card-body text-[#A1824A] lg:w-3/4">
        <div>
          <h2 className="card-title text-black">{name}</h2>
          <p>{category}</p>
        </div>
        <div>
          <p>Dimensions:</p>
          <p>
            {length}m &times; {width}m &times; {height}m
          </p>
        </div>
        <div>
          Furnitures List:
          <div className="capitalize line-clamp-2">
            {listFurnitures.size === 0 && <span>No furniture added yet</span>}
            {Array.from(listFurnitures).map(([furnitureName, count]) => (
              <span key={furnitureName} className="me-2">
                {furnitureName} &times; {count}
              </span>
            ))}
          </div>
        </div>
        <div className="card-actions justify-end">
          <button className="btn bg-[#F9DAD5] hover:bg-[#DFB3AD] border-0 me-1">Delete</button>{" "}
          <Link to={`/room/detail/${id}`}>
            <button className="btn bg-[#376A4F] text-white hover:bg-green-900 rounded-btn">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoomCard;

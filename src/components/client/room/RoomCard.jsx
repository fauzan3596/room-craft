import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRoomToFavorites, deleteRoom } from "../../../services/fetchApi";
import Swal from "sweetalert2";
import CardCanvas from "./CardCanvas";
import { HeartIcon } from "lucide-react";
import { useSelector } from "react-redux";

const RoomCard = ({ room }) => {
  const { id, name, category, length, width, height, furnitures, wallColor } =
    room;
  const { favoriteRooms } = useSelector((state) => state.favoriteRooms);
  const [animation, setAnimation] = useState(false);

  const isFavorite = favoriteRooms.some((room) => room.id === id);

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

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
      });
    },
  });

  const deleteHandler = (id) => {
    deleteMutation.mutate(id);
  };

  const addMutation = useMutation({
    mutationFn: addRoomToFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favoriteRooms"],
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
      });
    },
  });

  const addToFavoriteHandler = () => {
    addMutation.mutate(room);
  };

  const handleFavoriteClick = () => {
    setAnimation(true);
    addToFavoriteHandler();
    setTimeout(() => {
      setAnimation(false);
    }, 500);
  };

  return (
    <section className="card lg:card-side hover:border hover:shadow-xl">
      <figure className="lg:w-1/4">
        <CardCanvas
          length={length}
          width={width}
          height={height}
          wallColor={wallColor}
          furnitures={furnitures}
        />
      </figure>
      <div className="card-body text-[#A1824A] lg:w-3/4">
        <div className="flex justify-between">
          <div>
            <h2 className="card-title text-black">{name}</h2>
            <p>{category}</p>
          </div>
          <HeartIcon
            onClick={handleFavoriteClick}
            className={`h-7 w-7 text-[#a1824a] hover:fill-[#a1824a] ${
              isFavorite ? "fill-[#a1824a] hover:fill-none" : ""
            } ${animation ? "animate-pulse" : ""}`}
          />
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
          <button
            onClick={() => deleteHandler(id)}
            className="btn bg-[#F9DAD5] hover:bg-[#DFB3AD] border-0 me-1"
          >
            Delete
          </button>{" "}
          <Link to={`/user/room/detail/${id}`}>
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

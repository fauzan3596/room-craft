import React from "react";
import CardCanvas from "../room/CardCanvas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { addTemplate } from "../../../services/fetchApi";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv } from "uuid";

const RoomTemplateCard = ({ roomTemplate }) => {
  const {
    name,
    category,
    description,
    length,
    width,
    height,
    furnitures,
    wallColor,
    textureFloors,
    textureWalls,
  } = roomTemplate;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const listFurnitures = new Map();
  furnitures?.forEach((furniture) => {
    if (listFurnitures.has(furniture.name)) {
      listFurnitures.set(
        furniture.name,
        listFurnitures.get(furniture.name) + 1
      );
    } else {
      listFurnitures.set(furniture.name, 1);
    }
  });

  const addMutation = useMutation({
    mutationFn: addTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "There's an error in using this template",
      });
    },
  });

  const onClickHandler = async () => {
    const savedTemplate = { ...roomTemplate, id: uuidv() };
    await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to use this template?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        addMutation.mutate(savedTemplate);
        navigate(`/user/room/detail/${savedTemplate.id}`);
      }
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="h-80">
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
          <div className="flex justify-between items-end gap-1">
            <p className="text-[#A1824A] md:text-base text-sm">{category}</p>
            <p className="text-right md:text-sm text-xs">
              {length}m &times; {width}m &times; {height}m
            </p>
          </div>
          <h2 className="card-title">{name}</h2>
        </div>
        <p>{description}</p>
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
        <div className="card-actions justify-end mt-3" onClick={onClickHandler}>
          <button className="btn bg-[#F9DAD5] hover:bg-[#DFB3AD] border-0">
            Use Templates
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomTemplateCard;

import React, { useState } from "react";
import RoomDesign from "./RoomDesign";
import AllFurnitureList from "./AllFurnitureList";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveRoomDesign, updateFavoriteRoom } from "../../../services/fetchApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import FavoriteFurnitureList from "./FavoriteFurnitureList";

const AddFurnitureToRoom = ({ room, setStep }) => {
  const { id: roomId } = room;
  const { rooms } = useSelector((state) => state.rooms);
  const currentRoom = rooms.find((r) => r.id === roomId);
  const { favoriteRooms } = useSelector((state) => state.favoriteRooms);
  const currentFavoriteRoom = favoriteRooms.find((r) => r.id === roomId);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [itemOffset, setItemOffset] = useState(0);
  const [forcePage, setForcePage] = useState(0);

  const tabHandler = () => {
    setItemOffset(0);
    setForcePage(0);
  };

  const updateMutation = useMutation({
    mutationFn: async (updatedRoom) => {
      await saveRoomDesign(updatedRoom);
      if (currentFavoriteRoom) {
        await updateFavoriteRoom(updatedRoom);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
      queryClient.invalidateQueries({
        queryKey: ["favoriteRooms"],
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your room design has been successfully saved",
      });
      navigate("/room");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error Saving Your Design",
        text: "Something went wrong!",
      });
    },
  });

  const onSaveHandler = () => {
    const updatedRoom = { ...currentRoom };
    updateMutation.mutate(updatedRoom);
  };

  return (
    <section>
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab min-w-40"
          aria-label="All Furnitures"
          defaultChecked
          onClick={tabHandler}
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <AllFurnitureList
            roomId={roomId}
            itemOffset={itemOffset}
            setItemOffset={setItemOffset}
            forcePage={forcePage}
            setForcePage={setForcePage}
          />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab min-w-40"
          aria-label="Favorite Furnitures"
          onClick={tabHandler}
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <FavoriteFurnitureList
            roomId={roomId}
            itemOffset={itemOffset}
            setItemOffset={setItemOffset}
            forcePage={forcePage}
            setForcePage={setForcePage}
          />
        </div>
      </div>
      <h2 className="mt-4 text-center font-semibold text-2xl">
        Your Room Design
      </h2>
      <RoomDesign room={room} />
      <div className="flex justify-end mt-4">
        <button
          className="btn bg-[#F9DAD5] hover:bg-[#DFB3AD] border-0 me-3 w-20"
          onClick={() => setStep(1)}
        >
          Back
        </button>
        <button
          className="btn bg-green-900 w-20 text-white hover:bg-green-600"
          onClick={onSaveHandler}
        >
          Save
        </button>
      </div>
    </section>
  );
};

export default AddFurnitureToRoom;

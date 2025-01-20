import React from "react";
import RoomDesign from "./RoomDesign";
import AllFurnitureList from "./AllFurnitureList";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveRoomDesign } from "../../../services/fetchApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddFurnitureToRoom = ({ room, setStep }) => {
  const { id: roomId } = room;
  const { rooms } = useSelector((state) => state.rooms);
  const currentRoom = rooms.find((r) => r.id === roomId);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateMutation = useMutation({
    mutationFn: saveRoomDesign,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
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
        text: error.response?.data?.message || "Something went wrong!",
      });
    },
  });

  const onSaveHandler = (roomId) => {
    updateMutation.mutate({ roomId, currentRoom });
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
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <AllFurnitureList roomId={roomId} />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab min-w-40"
          aria-label="Favorite Furnitures"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          Tab content 2
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
          onClick={() => onSaveHandler(roomId)}
        >
          Save
        </button>
      </div>
    </section>
  );
};

export default AddFurnitureToRoom;

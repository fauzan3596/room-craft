import React, { useEffect } from "react";
import { roomCategories } from "../../utils/roomCategory";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRooms } from "../../services/fetchApi";
import { fetchRoomFailed, fetchRoomStart } from "../../redux/slice/roomSlice";
import { fetchFurnitureSuccess } from "../../redux/slice/furnitureSlice";
import { useDispatch } from "react-redux";
import { Loading, RoomCard } from "../../components";

const RoomPage = () => {
  const {
    data: rooms,
    isLoading: isRoomsLoading,
    isError: isRoomsError,
    error: roomsError,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: fetchAllRooms,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomStart());
    if (isRoomsError) {
      dispatch(fetchRoomFailed(roomsError.message));
    } else if (rooms) {
      dispatch(fetchFurnitureSuccess(rooms));
    }
  }, [rooms, isRoomsError, roomsError, dispatch]);

  if (isRoomsLoading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen w-full px-10 py-10">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-4xl">Rooms</h1>
        <button className="btn bg-green-900 text-white hover:bg-green-700 border-0 rounded-badge">
          Create New Room
        </button>
      </div>
      <label className="input bg-[#F5F0E5] text-[#A1824A] focus-within:outline-none focus-within:border-0 flex items-center gap-2 mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          className="grow placeholder:text-[#A1824A]"
          placeholder="Search rooms.."
        />
      </label>
      <div className="flex my-5 gap-3 flex-wrap">
        {roomCategories.map((category, index) => (
          <div
            className="badge badge-lg bg-[#F5F0E5] font-medium py-5 hover:bg-[#EDE7DA] cursor-pointer"
            key={index}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
};

export default RoomPage;

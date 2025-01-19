import React, { useEffect, useState } from "react";
import { roomCategories } from "../../utils/roomCategory";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRooms } from "../../services/fetchApi";
import {
  fetchRoomFailed,
  fetchRoomStart,
  fetchRoomSuccess,
} from "../../redux/slice/roomSlice";
import { useDispatch } from "react-redux";
import { Loading, RoomCard } from "../../components";
import useFilterRooms from "../../hooks/useFilterRooms";
import { Link } from "react-router-dom";

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
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchRoomStart());
    if (isRoomsError) {
      dispatch(fetchRoomFailed(roomsError.message));
    } else if (rooms) {
      dispatch(fetchRoomSuccess(rooms));
    }
  }, [rooms, isRoomsError, roomsError, dispatch]);

  const { filteredRooms, selectedCategories, setSelectedCategories } =
    useFilterRooms(rooms);

  const categoryChangeHandler = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const queryHandler = (e) => {
    setQuery(e.target.value);
  };

  const roomsResult = filteredRooms
    ? filteredRooms.filter((room) => {
        const searchResults = [
          room.name,
          room.category,
          room.height,
          room.length,
          room.width,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());

        return searchResults;
      })
    : [];

  if (isRoomsLoading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen w-full lg:px-10 py-10 px-5 ">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">Rooms</h1>{" "}
        <Link to="/room/add-room">
          <button className="btn bg-green-900 text-white hover:bg-green-700 border-0 rounded-badge">
            Create New Room
          </button>
        </Link>
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
          value={query}
          onChange={queryHandler}
        />
      </label>
      <div className="flex my-5 gap-3 flex-wrap">
        {roomCategories.map((category, index) => (
          <div
            className={`badge badge-lg ${
              selectedCategories.includes(category)
                ? "bg-green-900 bg-opacity-70 text-white hover:bg-green-900 hover:bg-opacity-10 hover:text-black"
                : "bg-green-900 bg-opacity-10 text-black hover:bg-green-900 hover:bg-opacity-70 hover:text-white"
            } font-medium py-5 cursor-pointer transition-all`}
            key={index}
            onClick={() => categoryChangeHandler(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-5">
        {roomsResult.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
};

export default RoomPage;

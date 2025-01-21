import React, { useEffect, useState } from "react";
import { roomCategories } from "../../utils/roomCategory";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRooms } from "../../services/fetchApi";
import {
  fetchRoomFailed,
  fetchRoomStart,
  fetchRoomSuccess,
} from "../../redux/slice/roomSlice";
import { useDispatch, useSelector } from "react-redux";
import { AllRooms, FavoriteRooms, Loading, RoomCard } from "../../components";
import useFilterRooms from "../../hooks/useFilterRooms";
import { Link } from "react-router-dom";

const RoomPage = () => {
  const {
    data: rooms,
    isError: isRoomsError,
    error: roomsError,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: fetchAllRooms,
  });
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { favoriteRooms } = useSelector((state) => state.favoriteRooms);

  useEffect(() => {
    dispatch(fetchRoomStart());
    if (isRoomsError) {
      dispatch(fetchRoomFailed(roomsError.message));
    } else if (rooms) {
      dispatch(fetchRoomSuccess(rooms));
    }
  }, [rooms, isRoomsError, roomsError, dispatch]);

  const {
    filteredRooms,
    filteredFavoriteRooms,
    selectedCategories,
    setSelectedCategories,
  } = useFilterRooms(rooms, favoriteRooms);

  const categoryChangeHandler = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(debounceHandler);
  }, [query]);

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
          .includes(debouncedQuery.toLowerCase());

        return searchResults;
      })
    : [];

  const favoriteRoomsResult = filteredFavoriteRooms
    ? filteredFavoriteRooms.filter((room) => {
        const searchResults = [
          room.name,
          room.category,
          room.height,
          room.length,
          room.width,
        ]
          .join(" ")
          .toLowerCase()
          .includes(debouncedQuery.toLowerCase());

        return searchResults;
      })
    : [];

  return (
    <main className="min-h-screen w-full lg:px-10 py-10 px-5 ">
      <div className="flex justify-between items-center">
        <h1 className="font-bold sm:text-3xl text-xl">Rooms</h1>{" "}
        <div className="flex gap-2">
          <Link to="/room/template-room">
            <button className="btn sm:btn-md btn-sm sm:text-base text-xs bg-[#F9DAD5] hover:bg-[#DFB3AD] border-0 rounded-badge">
             Room Templates
            </button>
          </Link>
          <Link to="/room/add-room">
            <button className="btn sm:btn-md btn-sm sm:text-base text-xs bg-green-900 text-white hover:bg-green-700 border-0 rounded-badge">
              Create New Room
            </button>
          </Link>
        </div>
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
                ? "bg-[#F9DAD5] hover:bg-[#F5F0E5]"
                : "bg-[#F5F0E5] hover:bg-[#F9DAD5]"
            } font-medium py-5 cursor-pointer transition-all border-0`}
            key={index}
            onClick={() => categoryChangeHandler(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab min-w-40"
          aria-label="All Rooms"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <AllRooms roomsResult={roomsResult} />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab min-w-40"
          aria-label="Favorite Rooms"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <FavoriteRooms favoriteRooms={favoriteRoomsResult} />
        </div>
      </div>
    </main>
  );
};

export default RoomPage;

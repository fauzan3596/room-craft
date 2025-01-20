import React from "react";
import RoomCard from "./RoomCard";

const AllRooms = ({ roomsResult }) => {
  return (
    <div className="grid lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-5">
      {roomsResult.length > 0 ? (
        roomsResult.map((room) => <RoomCard key={room.id} room={room} />)
      ) : (
        <p className="text-gray-400 text-center mt-4">
          There's no rooms found. Please add some rooms first.
        </p>
      )}
    </div>
  );
};

export default AllRooms;

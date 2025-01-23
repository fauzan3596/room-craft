import React from "react";
import RoomCard from "./RoomCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FavoriteRooms = ({
  favoriteRooms,
  itemOffset,
  setItemOffset,
  forcePage,
  setForcePage,
}) => {
  const itemsPerPage = 4;

  const endOffset = itemOffset + itemsPerPage;
  const currentRooms = favoriteRooms?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(favoriteRooms?.length / itemsPerPage);

  const nextPageChange = () => {
    if (forcePage === pageCount - 1 || pageCount === 0) return;
    setItemOffset(Number(itemOffset + Number(itemsPerPage)));
    setForcePage(forcePage + 1);
  };

  const prevPageChange = () => {
    if (forcePage === 0 || pageCount === 0) return;
    setItemOffset(Number(itemOffset - Number(itemsPerPage)));
    setForcePage(forcePage - 1);
  };

  return (
    <section>
      <div className="grid lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-5">
        {currentRooms.length > 0 ? (
          currentRooms.map((room) => <RoomCard key={room.id} room={room} />)
        ) : (
          <p className="text-gray-400 text-center mt-4">
            There's no rooms found. Please add some rooms first.
          </p>
        )}
      </div>
      <div className="flex justify-center gap-3 mt-3">
        <ChevronLeft
          onClick={prevPageChange}
          className={`h-8 w-8 ${
            forcePage === 0 || pageCount === 0
              ? "text-gray-200 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        />
        <ChevronRight
          onClick={nextPageChange}
          className={`h-8 w-8 ${
            forcePage === pageCount - 1 || pageCount === 0
              ? "text-gray-200 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        />
      </div>
    </section>
  );
};

export default FavoriteRooms;

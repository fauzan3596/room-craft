import React from "react";
import FurnitureCardRoom from "./FurnitureCardRoom";
import { useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FavoriteFurnitureList = ({
  roomId,
  itemOffset,
  setItemOffset,
  forcePage,
  setForcePage,
}) => {
  const { favoriteFurnitures } = useSelector(
    (state) => state.favoriteFurnitures
  );
  const itemsPerPage = 6;

  const endOffset = itemOffset + itemsPerPage;
  const currentFurnitures = favoriteFurnitures?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(favoriteFurnitures?.length / itemsPerPage);

  const nextPageChange = () => {
    if (forcePage === pageCount - 1 || pageCount === 0) return;
    setItemOffset(Number(itemOffset + Number(itemsPerPage)));
    setForcePage(forcePage + 1);
    window.scrollTo(0, 0);
  };

  const prevPageChange = () => {
    if (forcePage === 0 || pageCount === 0) return;
    setItemOffset(Number(itemOffset - Number(itemsPerPage)));
    setForcePage(forcePage - 1);
    window.scrollTo(0, 0);
  };

  return (
    <section>
      {favoriteFurnitures.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentFurnitures.map((furniture) => (
              <FurnitureCardRoom
                furniture={furniture}
                roomId={roomId}
                key={furniture.id}
              />
            ))}
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
        </>
      ) : (
        "No favorite furnitures yet."
      )}
    </section>
  );
};

export default FavoriteFurnitureList;

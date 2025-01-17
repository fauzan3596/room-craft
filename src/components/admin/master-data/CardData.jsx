import React from "react";
import ProductDataCard from "./ProductDataCard";
import CardPagination from "./CardPagination";

const CardData = ({
  furnitures,
  forcePage,
  setForcePage,
  itemOffset,
  setItemOffset,
}) => {
  const itemsPerPage = 6;

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    const newForcePage = event.selected;
    setItemOffset(newOffset);
    setForcePage(newForcePage);
    window.scrollTo(0, 0);
  };

  const endOffset = itemOffset + itemsPerPage;
  const currentFurnitures = furnitures?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(furnitures?.length / itemsPerPage);

  return (
    <section className="mt-5">
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-3 gap-y-8">
        {currentFurnitures.map((furniture) => (
          <ProductDataCard key={furniture.id} furniture={furniture} />
        ))}
      </div>
      <div className="flex lg:flex-row flex-col items-center justify-between mt-5 gap-5">
          <p className="sm:text-base text-sm">
            Showing {itemOffset + 1}-
            {endOffset <= furnitures?.length
              ? endOffset
              : furnitures?.length}{" "}
            of {furnitures?.length} products
          </p>
          {furnitures?.length >= itemsPerPage && (
            <CardPagination
              pageCount={pageCount}
              forcePage={forcePage}
              handlePageClick={handlePageClick}
            />
          )}
        </div>
    </section>
  );
};

export default CardData;

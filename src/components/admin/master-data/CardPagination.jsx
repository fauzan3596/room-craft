import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import ReactPaginate from "react-paginate";

const CardPagination = ({ pageCount, handlePageClick, forcePage }) => {
  return (
    <ReactPaginate
      className="join"
      previousLabel={<ChevronLeft className="h-4 w-4" />}
      nextLabel={<ChevronRight className="h-4 w-4" />}
      breakLabel="..."
      breakClassName="join-item btn btn-sm bg-white"
      breakLinkClassName="text-black bg-transparent"
      pageCount={pageCount}
      pageRangeDisplayed={1}
      marginPagesDisplayed={2}
      onPageChange={handlePageClick}
      pageLinkClassName="join-item btn btn-sm text-black bg-white"
      previousLinkClassName={`page-link bg-white join-item btn btn-sm text-black ${
        forcePage === 0 ? "btn-disabled" : ""
      }`}
      nextLinkClassName={`join-item bg-white btn btn-sm text-black ${
        forcePage === pageCount - 1 ? "btn-disabled" : ""
      }`}
      activeClassName="active border-0 bg-green-800"
      activeLinkClassName="page-link !bg-green-800 text-white font-bold border-0 "
      forcePage={forcePage}
      disabledClassName="cursor-not-allowed"
    />
  );
};

export default CardPagination;

import React, { useState } from "react";
import { formatTableDate } from "../../../utils/getCurrentDate";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFurniture } from "../../../services/fetchApi";

const TableData = ({
  furnitures,
  forcePage,
  setForcePage,
  itemOffset,
  setItemOffset,
}) => {
  const queryClient = useQueryClient();
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const endOffset = itemOffset + itemsPerPage;
  const currentFurnitures =
    itemsPerPage === "All"
      ? furnitures
      : furnitures?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(furnitures?.length / itemsPerPage);

  const rowChange = (e) => {
    setItemsPerPage(e.target.value);
    setItemOffset(0);
    setForcePage(0);
  };

  const pageChange = (type) => {
    if (itemsPerPage === "All") {
      return;
    } else if (type === "next") {
      if (forcePage === pageCount - 1 || pageCount === 0) return;
      setItemOffset(Number(itemOffset + itemsPerPage));
      setForcePage(forcePage + 1);
    } else if (type === "prev") {
      if (forcePage === 0 || pageCount === 0) return;
      setItemOffset(Number(itemOffset - itemsPerPage));
      setForcePage(forcePage - 1);
    } else if (type === "first") {
      if (forcePage === 0 || pageCount === 0) return;
      setItemOffset(0);
      setForcePage(0);
    } else {
      if (forcePage === pageCount - 1 || pageCount === 0) return;
      setItemOffset(furnitures.length - 1);
      setForcePage(pageCount - 1);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: deleteFurniture,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["furnitures"],
      });
    },
  });

  const deleteHandler = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <section className="overflow-x-auto mt-4">
      <table className="table table-zebra">
        <thead>
          <tr className="bg-green-900 bg-opacity-30 border-0 text-black text-opacity-80">
            <th>#</th>
            <th>Products</th>
            <th>Dimensions</th>
            <th>Updated at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-xs sm:text-sm">
          {currentFurnitures.map((furniture, index) => {
            const {
              id,
              category,
              name,
              length,
              width,
              height,
              imgUrl,
              updatedAt,
            } = furniture;
            return (
              <tr key={id} className="bg-green-900 bg-opacity-10">
                <th>{index + itemOffset + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="sm:avatar hidden">
                      <div className="mask mask-squircle h-12 w-12 bg-black">
                        <img
                          src={`https://res.cloudinary.com/dlnqwafkc/image/upload/v1737115078/${imgUrl}.png`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{name}</div>
                      <div className="text-sm opacity-50">{category}</div>
                    </div>
                  </div>
                </td>
                <td>{`${length}m X ${width}m X ${height}m`}</td>
                <td>{formatTableDate(updatedAt)}</td>
                <th>
                  <button className="p-2 text-green-900 hover:bg-green-900 hover:bg-opacity-30 rounded-full">
                    <Link to={`/admin/master-data/edit/${id}`}>
                      <Edit className="w-5 h-5" />
                    </Link>
                  </button>
                  <button
                    onClick={() => deleteHandler(id)}
                    className="p-2 text-pink-600 hover:bg-pink-900 hover:bg-opacity-30 rounded-full"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <p>Rows per page: </p>
          <select
            value={itemsPerPage}
            onChange={rowChange}
            className="select select-bordered select-sm w-fit"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value="All">All</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <p>{`${itemOffset + 1}-${
            endOffset <= furnitures.length
              ? Number(endOffset)
              : furnitures.length
          } of ${furnitures.length}`}</p>
          <div
            onClick={() => pageChange("first")}
            className={`border rounded-full border-gray-400 hover:bg-gray-200 hover:border-gray-600 p-1 ${
              forcePage === 0 || itemsPerPage === "All" || pageCount === 0
                ? "!bg-gray-400 !border-gray-400 cursor-not-allowed"
                : ""
            }`}
          >
            <ChevronFirst className="h-4 w-4" />
          </div>
          <div
            onClick={() => pageChange("prev")}
            className={`border rounded-full border-gray-400 hover:bg-gray-200 hover:border-gray-600 p-1 ${
              forcePage === 0 || itemsPerPage === "All" || pageCount === 0
                ? "!bg-gray-400 !border-gray-400 cursor-not-allowed"
                : ""
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
          </div>
          <div
            onClick={() => pageChange("next")}
            className={`border rounded-full border-gray-400 hover:bg-gray-200 hover:border-gray-600 p-1 ${
              forcePage === pageCount - 1 ||
              itemsPerPage === "All" ||
              pageCount === 0
                ? "!bg-gray-400 !border-gray-400 cursor-not-allowed"
                : ""
            }`}
          >
            <ChevronRight className="h-4 w-4" />
          </div>
          <div
            onClick={() => pageChange("last")}
            className={`border rounded-full border-gray-400 hover:bg-gray-200 hover:border-gray-600 p-1 ${
              forcePage === pageCount - 1 ||
              itemsPerPage === "All" ||
              pageCount === 0
                ? "!bg-gray-400 !border-gray-400 cursor-not-allowed"
                : ""
            }`}
          >
            <ChevronLast className="h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableData;

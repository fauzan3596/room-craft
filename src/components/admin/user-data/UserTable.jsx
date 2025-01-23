import React, { useState } from "react";
import { formatWIBTime } from "../../../utils/getCurrentDate";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const UserTable = ({ users }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [forcePage, setForcePage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const endOffset = Number(itemOffset) + Number(itemsPerPage);
  const currentUsers =
    itemsPerPage === "All" ? users : users?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(users?.length / itemsPerPage);

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
      setItemOffset(Number(itemOffset + Number(itemsPerPage)));
      setForcePage(forcePage + 1);
    } else if (type === "prev") {
      if (forcePage === 0 || pageCount === 0) return;
      setItemOffset(Number(itemOffset - Number(itemsPerPage)));
      setForcePage(forcePage - 1);
    } else if (type === "first") {
      if (forcePage === 0 || pageCount === 0) return;
      setItemOffset(0);
      setForcePage(0);
    } else {
      if (forcePage === pageCount - 1 || pageCount === 0) return;
      setItemOffset(users.length - 1);
      setForcePage(pageCount - 1);
    }
  };

  return (
    <section className="overflow-x-auto mt-4">
      <table className="table table-zebra">
        <thead>
          <tr className="bg-green-900 bg-opacity-30 border-0 text-black text-opacity-80">
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody className="text-xs sm:text-sm">
          {currentUsers.map((user, index) => {
            const { id, name, email, createdAt } = user;
            return (
              <tr key={id} className="bg-green-900 bg-opacity-10">
                <th>{index + itemOffset + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="font-bold">{name}</div>
                  </div>
                </td>
                <td>{email}</td>
                <td>{formatWIBTime(createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex sm:flex-row flex-col sm:items-center justify-between mt-4 gap-4">
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
            endOffset <= users.length ? Number(endOffset) : users.length
          } of ${users.length}`}</p>
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

export default UserTable;

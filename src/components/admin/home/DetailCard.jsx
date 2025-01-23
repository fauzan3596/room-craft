import { Boxes, Users2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const DetailCard = ({ type }) => {
  const { furnitures } = useSelector(
    (state) => state.furnitures
  );
  const { allUsers } = useSelector((state) => state.allUsers);
  const filteredUsers = allUsers.filter((user) => user.role === "user");

  return (
    <section className="card bg-green-900 bg-opacity-10 text-green-900 w-full shadow-xl">
      <div className="card-body">
        <div className="flex items-center gap-2">
          {type === "products" ? (
            <Boxes className="h-9 w-9" />
          ) : (
            <Users2 className="h-9 w-9" />
          )}
          <h2 className="card-title sm:text-2xl text-base">
            {type === "products" ? "Total Products" : "Total Users"}
          </h2>
        </div>
        <p className="font-bold text-4xl mt-3">
          {type === "products" ? furnitures.length : filteredUsers.length}
        </p>
      </div>
    </section>
  );
};

export default DetailCard;

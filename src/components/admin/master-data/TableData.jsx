import React from "react";
import { formatTableDate } from "../../../utils/getCurrentDate";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import FeaturedModel from "../home/FeaturedModel";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFurniture } from "../../../services/fetchApi";

const TableData = ({ furnitures }) => {
  const queryClient = useQueryClient();

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
          {furnitures.map((furniture, index) => {
            const {
              id,
              category,
              name,
              length,
              width,
              height,
              imgUrl,
              scale,
              position,
              updatedAt,
            } = furniture;
            return (
              <tr key={id} className="bg-green-900 bg-opacity-10">
                <th>{index + 1}</th>
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
                    className="p-2 text-pink-600 hover:bg-pink-900 hover:bg-opacity-30 rounded-full "
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default TableData;

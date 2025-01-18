import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { formatCardDate } from "../../../utils/getCurrentDate";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFurniture } from "../../../services/fetchApi";

const ProductDataCard = ({ furniture }) => {
  const {
    id,
    name,
    category,
    length,
    width,
    height,
    imgUrl,
    updatedAt,
  } = furniture;
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
    <div className="card bg-green-900 bg-opacity-10 ">
      <figure className="h-48">
        <img src={`https://res.cloudinary.com/dlnqwafkc/image/upload/v1737115078/${imgUrl}.png`} />
      </figure>
      <div className="card-body text-[#6D6666]">
        <h2 className="card-title">{name}</h2>
        <div>
          <p>{category}</p>
        </div>
        <div>
          <p>{`${length}m X ${width}m X ${height}m`}</p>
        </div>
        <div>
          <p>{formatCardDate(updatedAt)}</p>
        </div>
        <div className="card-actions justify-end">
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
        </div>
      </div>
    </div>
  );
};

export default ProductDataCard;

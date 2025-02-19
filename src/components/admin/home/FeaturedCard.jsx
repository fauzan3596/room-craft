import { Edit, Trash2 } from "lucide-react";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFurniture } from "../../../services/fetchApi";
import { Link } from "react-router-dom";

const FeaturedCard = ({ furniture }) => {
  const {
    id,
    name,
    description,
    length,
    width,
    height,
    imgUrl,
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
    <div className="card bg-green-900 bg-opacity-10 shadow-xl">
      <figure className="h-48">
        <img
          src={`https://res.cloudinary.com/dlnqwafkc/image/upload/v1737115078/${imgUrl}.png`}
        />
      </figure>
      <div className="card-body text-[#6D6666]">
        <h2 className="card-title">
          {name} <div className="badge badge-error bg-opacity-50">NEW</div>
        </h2>
        <p className="line-clamp-2">{description}</p>
        <div>
          <p className="font-medium">Dimensions:</p>
          <p>{`${length}m X ${width}m X ${height}m`}</p>
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

export default FeaturedCard;

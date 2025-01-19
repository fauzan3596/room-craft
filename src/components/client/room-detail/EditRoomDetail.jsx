import React, { useEffect, useState } from "react";
import { roomCategories } from "../../../utils/roomCategory";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoom } from "../../../services/fetchApi";
import { useDispatch } from "react-redux";
import { updateRoomState } from "../../../redux/slice/roomSlice";

const EditRoomDetail = ({ room, setStep }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    length: "",
    width: "",
    height: "",
  });
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    if (room) {
      setFormData({
        name: room.name,
        description: room.description,
        category: room.category,
        length: room.length,
        width: room.width,
        height: room.height,
      });
    }
  }, [room]);

  const updateMutation = useMutation({
    mutationFn: updateRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["room", room.id],
      });
      setStep(2);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error,
      });
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const newRoom = {
      ...room,
      ...formData,
      updatedAt: new Date().toISOString(),
    };
    // updateMutation.mutate({ id: room.id, newRoom });
    dispatch(updateRoomState(newRoom));
    setStep(2);
  };

  return (
    <section>
      <form className="form-control" onSubmit={submitHandler}>
        <div className="label">
          <span className="label-text">Room Name</span>
        </div>
        <input
          type="text"
          placeholder="Master Bedroom"
          className="input input-bordered w-full bg-[#B3BEB3] bg-opacity-20"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <div className="label">
          <span className="label-text mt-2">Room Description</span>
        </div>
        <textarea
          type="text"
          placeholder="Filled with a serene and spacious space separated from the rest of the house"
          className="textarea textarea-bordered w-full bg-[#B3BEB3] bg-opacity-20"
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <div className="label">
          <span className="label-text mt-2">Room Category</span>
        </div>
        <select
          className="select select-bordered w-full bg-[#B3BEB3] bg-opacity-20"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          {roomCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="label flex justify-between">
          <p className="label-text mt-2 w-full">
            Room length <span className="text-gray-400 font-medium">(m)</span>
          </p>
          <input
            type="number"
            className="input text-right focus-within:outline-none focus-within:border-0 [&::-webkit-inner-spin-button]:appearance-none"
            value={formData.length}
            onChange={(e) =>
              setFormData({ ...formData, length: Number(e.target.value) })
            }
          />
        </div>
        <div className="flex px-1 gap-8 items-center">
          <span>0</span>
          <input
            type="range"
            min={0}
            max={50}
            value={formData.length}
            onChange={(e) =>
              setFormData({ ...formData, length: Number(e.target.value) })
            }
            className="range range-xs range-success"
          />
          <span>50</span>
        </div>
        <div className="label flex justify-between">
          <p className="label-text mt-2 w-full">
            Room width <span className="text-gray-400 font-medium">(m)</span>
          </p>
          <input
            type="number"
            className="input text-right focus-within:outline-none focus-within:border-0 [&::-webkit-inner-spin-button]:appearance-none"
            value={formData.width}
            onChange={(e) =>
              setFormData({ ...formData, width: Number(e.target.value) })
            }
          />
        </div>
        <div className="flex px-1 gap-8 items-center">
          <span>0</span>
          <input
            type="range"
            min={0}
            max={50}
            value={formData.width}
            onChange={(e) =>
              setFormData({ ...formData, width: Number(e.target.value) })
            }
            className="range range-xs range-success"
          />
          <span>50</span>
        </div>
        <div className="label flex justify-between">
          <p className="label-text mt-2 w-full">
            Room height <span className="text-gray-400 font-medium">(m)</span>
          </p>
          <input
            type="number"
            className="input text-right focus-within:outline-none focus-within:border-0 [&::-webkit-inner-spin-button]:appearance-none"
            value={formData.height}
            onChange={(e) =>
              setFormData({ ...formData, height: Number(e.target.value) })
            }
          />
        </div>
        <div className="flex px-1 gap-8 items-center">
          <span>0</span>
          <input
            type="range"
            min={0}
            max={50}
            value={formData.height}
            onChange={(e) =>
              setFormData({ ...formData, height: Number(e.target.value) })
            }
            className="range range-xs range-success"
          />
          <span>50</span>
        </div>
        <div className="flex justify-end mt-4">
          <Link to="/room">
            <button className="btn bg-[#F9DAD5] hover:bg-[#DFB3AD] border-0 me-3 w-20">Back</button>
          </Link>
          <button className="btn bg-green-900 w-20 text-white hover:bg-green-600">
            Next
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditRoomDetail;

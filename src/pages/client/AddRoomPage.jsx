import React, { useState } from "react";
import { roomCategories } from "../../utils/roomCategory";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRoom } from "../../services/fetchApi";
import Swal from "sweetalert2";

const AddRoomPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Living Room",
    length: 0,
    width: 0,
    height: 0,
    wallColor: "",
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addMutation = useMutation({
    mutationFn: addRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "New room has been added successfully",
      });
      navigate("/room");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error Adding Data",
        text: error.response?.data?.message || "Something went wrong!",
      });
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const newRoom = {
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      furnitures: [],
    };
    addMutation.mutate(newRoom);
  };

  return (
    <main className="min-h-screen sm:w-3/4 mx-auto py-10 sm:px-0 px-5">
      <h1 className="font-bold text-3xl">Create a new Room</h1>
      <form className="form-control mt-4" onSubmit={submitHandler}>
        <div className="label">
          <span className="label-text">Room Name</span>
        </div>
        <input
          type="text"
          placeholder="Master Bedroom"
          className="input input-bordered w-full"
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
          className="textarea textarea-bordered w-full"
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
          className="select select-bordered w-full"
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
        <div className="label">
          <span className="label-text mt-2">Room Wall Color</span>
        </div>
        <div className="flex items-center gap-5">
          <input
            type="color"
            value={formData.wallColor}
            onChange={(e) =>
              setFormData({ ...formData, wallColor: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="#000000"
            className="input input-bordered"
            required
            value={formData.wallColor}
            onChange={(e) =>
              setFormData({ ...formData, wallColor: e.target.value })
            }
          />
        </div>
        <div className="flex justify-end mt-4">
          <Link to="/room">
            <button className="btn btn-error me-3 w-20">Cancel</button>
          </Link>
          <button className="btn bg-green-900 w-20 text-white hover:bg-green-600">
            Save
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddRoomPage;

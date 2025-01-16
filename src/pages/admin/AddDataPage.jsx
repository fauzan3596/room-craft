import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UploadWidget } from "../../components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFurniture } from "../../services/fetchApi";
import Swal from "sweetalert2";

const AddDataPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Electronics",
    length: "",
    width: "",
    height: "",
    modelUrl: "",
  });

  const addMutation = useMutation({
    mutationFn: addFurniture,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["furnitures"],
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "New furniture has been added successfully",
      });
      navigate("/admin/master-data");
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
    if (!formData.modelUrl) {
      return Swal.fire({
        title: "Error!",
        text: "Please upload an image",
        icon: "error",
      });
    }
    const newFurniture = {
      ...formData,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addMutation.mutate(newFurniture);
  };

  return (
    <main className="p-5">
      <div className="breadcrumbs text-xl text-[#14532D]">
        <ul>
          <li>
            <Link to="/admin/master-data">Master Data</Link>
          </li>
          <li>Add Data</li>
        </ul>
      </div>
      <div className="bg-green-900 bg-opacity-10 p-5 mt-4 rounded-lg text-[#6D6666]">
        <h2 className="text-xl font-bold text-[#4A4140]">Add Product</h2>
        <form className="form-control" onSubmit={submitHandler}>
          <div className="flex md:flex-row flex-col pt-5 pb-3">
            <label className="font-medium pb-3 md:pb-0 basis-1/4">Name</label>
            <input
              type="text"
              placeholder="Product name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="flex md:flex-row flex-col my-3">
            <label className="font-medium pb-3 md:pb-0 basis-1/4">
              Description
            </label>
            <textarea
              type="text"
              placeholder="Product description"
              className="textarea textarea-bordered w-full"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>
          <div className="flex md:flex-row flex-col my-3">
            <label className="font-medium pb-3 md:pb-0 basis-1/4">
              Category
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="Electronics">Electronics</option>
              <option value="Interior Decorations">Interior Decorations</option>
              <option value="Bedroom Accessories">Bedroom Accessories</option>
              <option value="Kitchen Equipments">Kitchen Equipments</option>
              <option value="Bathroom Equipments">Bathroom Equpments</option>
            </select>
          </div>
          <div className="flex md:flex-row flex-col my-3">
            <label className="font-medium pb-3 md:pb-0 basis-1/4">
              Length (m)
            </label>
            <input
              type="number"
              placeholder="Product length in meters"
              className="input input-bordered w-full [&::-webkit-inner-spin-button]:appearance-none"
              value={formData.length}
              onChange={(e) =>
                setFormData({ ...formData, length: e.target.value })
              }
              required
            />
          </div>
          <div className="flex md:flex-row flex-col my-3">
            <label className="font-medium pb-3 md:pb-0 basis-1/4">
              Width (m)
            </label>
            <input
              type="number"
              placeholder="Product width in meters"
              className="input input-bordered w-full [&::-webkit-inner-spin-button]:appearance-none"
              value={formData.width}
              onChange={(e) =>
                setFormData({ ...formData, width: e.target.value })
              }
              required
            />
          </div>
          <div className="flex md:flex-row flex-col my-3">
            <label className="font-medium pb-3 md:pb-0 basis-1/4">
              Height (m)
            </label>
            <input
              type="number"
              placeholder="Product height in meters"
              className="input input-bordered w-full [&::-webkit-inner-spin-button]:appearance-none"
              value={formData.height}
              onChange={(e) =>
                setFormData({ ...formData, height: e.target.value })
              }
              required
            />
          </div>
          <div className="flex md:flex-row flex-col my-3">
            <label className="font-medium pb-3 md:pb-0 basis-1/4">Model</label>
            <UploadWidget
              setModelUrl={(public_id) =>
                setFormData({ ...formData, modelUrl: public_id })
              }
            />
          </div>
          <div className="flex justify-end mt-3">
            <Link to="/admin/master-data">
              <button className="btn btn-error me-3 w-20">Cancel</button>
            </Link>
            <button className="btn bg-green-900 w-20 text-white hover:bg-green-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddDataPage;

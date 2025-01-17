import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UploadWidgetImage, UploadWidgetModel } from "../../components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFurniture } from "../../services/fetchApi";
import Swal from "sweetalert2";

const AddDataPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Tables",
    length: "",
    width: "",
    height: "",
    modelUrl: "",
    imgUrl: "",
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
    if (!formData.modelUrl && !formData.imgUrl) {
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
              placeholder="Wooden Chair"
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
              placeholder="Wooden chair is made of wood"
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
              <option value="Tables">Tables</option>
              <option value="Seating">Seating</option>
              <option value="Lighting">Lighting</option>
              <option value="Bedroom & Sleeping Essentials">
                Bedroom & Sleeping Essentials
              </option>
              <option value="Kitchen & Bathroom Equipment">
                Kitchen & Bathroom Equipment
              </option>
              <option value="Electronics & Interior Decorations">
                Electronics & Interior Decorations
              </option>
            </select>
          </div>
          <div className="flex md:flex-row flex-col my-3">
            <label className="font-medium pb-3 md:pb-0 basis-1/4">
              Length (m)
            </label>
            <input
              type="number"
              placeholder="2.5"
              className="input input-bordered w-full [&::-webkit-inner-spin-button]:appearance-none"
              value={formData.length}
              onChange={(e) =>
                setFormData({ ...formData, length: Number(e.target.value) })
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
              placeholder="2.5"
              className="input input-bordered w-full [&::-webkit-inner-spin-button]:appearance-none"
              value={formData.width}
              onChange={(e) =>
                setFormData({ ...formData, width: Number(e.target.value) })
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
              placeholder="2.5"
              className="input input-bordered w-full [&::-webkit-inner-spin-button]:appearance-none"
              value={formData.height}
              onChange={(e) =>
                setFormData({ ...formData, height: Number(e.target.value) })
              }
              required
            />
          </div>
          <div className="flex md:flex-row flex-col my-3">
            <label className="font-medium pb-3 md:pb-0 basis-1/4">Model</label>
            <UploadWidgetModel
              setModelUrl={(public_id) =>
                setFormData({ ...formData, modelUrl: public_id })
              }
            />
          </div>
          <div className="flex md:flex-row flex-col my-3">
            <label className="font-medium pb-3 md:pb-0 basis-1/4">Image</label>
            <UploadWidgetImage
              setImgUrl={(public_id) =>
                setFormData({ ...formData, imgUrl: public_id })
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

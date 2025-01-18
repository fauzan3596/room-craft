import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchFurnitureById, updateFurniture } from "../../services/fetchApi";
import {
  Loading,
  UploadWidgetImage,
  UploadWidgetModel,
} from "../../components";
import Swal from "sweetalert2";
import ErrorAdminPage from "./ErrorAdminPage";

const EditDataPage = () => {
  const { id } = useParams();
  const {
    data: furniture,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["furniture", id],
    queryFn: () => fetchFurnitureById(id),
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    length: "",
    width: "",
    height: "",
    modelUrl: "",
    imgUrl: "",
  });

  useEffect(() => {
    if (furniture) {
      setFormData({
        name: furniture?.name,
        description: furniture?.description,
        category: furniture?.category,
        length: furniture?.length,
        width: furniture?.width,
        height: furniture?.height,
        modelUrl: furniture?.modelUrl,
        imgUrl: furniture?.imgUrl,
      });
    }
  }, [furniture]);

  const updateMutation = useMutation({
    mutationFn: updateFurniture,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["furnitures"],
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your furniture has been updated successfully",
      });
      navigate("/admin/master-data");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error Adding Data",
        text: error,
      });
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const newFurniture = {
      ...furniture,
      ...formData,
      updatedAt: new Date().toISOString(),
    };
    updateMutation.mutate({ id, newFurniture });
  };

  if (isError) {
    return <ErrorAdminPage />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="p-5">
      <div className="breadcrumbs text-xl text-[#14532D]">
        <ul>
          <li>
            <Link to="/admin/master-data">Master Data</Link>
          </li>
          <li>Edit Data</li>
        </ul>
      </div>
      <div className="bg-green-900 bg-opacity-10 p-5 mt-4 rounded-lg text-[#6D6666]">
        <h2 className="text-xl font-bold text-[#4A4140]">Edit Product</h2>
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
              placeholder="Wooden chair is made of woods"
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
              modelId={formData.modelUrl}
            />
          </div>
          <div className="flex md:flex-row flex-col my-3">
            <label className="font-medium pb-3 md:pb-0 basis-1/4">Image</label>
            <UploadWidgetImage
              setImgUrl={(public_id) =>
                setFormData({ ...formData, imgUrl: public_id })
              }
              imgId={formData.imgUrl}
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

export default EditDataPage;

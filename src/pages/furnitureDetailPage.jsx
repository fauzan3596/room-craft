import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { fetchFurnitureById } from "../services/fetchApi";

const FurnitureDetail = () => {
  const { id } = useParams();
  const [furniture, setFurniture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFurnitureDetail = async () => {
      try {
        const data = await fetchFurnitureById(id);
        if (data) {
          setFurniture(data);
        } else {
          setError("Furniture not found");
        }
      } catch (err) {
        setError("Error fetching furniture details");
      } finally {
        setLoading(false);
      }
    };

    getFurnitureDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-8 sm:px-16 md:px-40 py-8 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{furniture.name}</h1>
          <div className="relative bg-gray-800 aspect-video rounded-lg overflow-hidden mb-6">
            <Canvas
              camera={{ position: [0, 0.5, 2.5], fov: 50 }}
              shadows
              style={{
                background:
                  "radial-gradient(circle, rgba(70,70,70,1) 0%, rgba(0,0,0,1) 100%)",
              }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight castShadow position={[1, 1, 1]} intensity={0.7} />
              <pointLight position={[-2, 2, 3]} intensity={0.5} />
              <Environment preset="studio" />
              <CardModel modelUrl={furniture.modelUrl} />
              <OrbitControls />
            </Canvas>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Description</h2>
          <p className="text-gray-600 mt-2">{furniture.description}</p>
          <p className="text-gray-600 mt-2">
            <strong>Category:</strong> {furniture.category}
          </p>
        </div>
      </div>
    </div>
  );
};

const CardModel = ({ modelUrl }) => {
  const { scene } = useGLTF(
    `https://res.cloudinary.com/dlnqwafkc/image/upload/v1736614683/${modelUrl}.glb`
  );
  return <primitive object={scene} />;
};

export default FurnitureDetail;

import { Edit, Trash2 } from "lucide-react";
import React from "react";
import FeaturedModel from "./FeaturedModel";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

const FeaturedCard = ({ furniture }) => {
  const {
    name,
    description,
    length,
    width,
    height,
    modelUrl,
    scale,
    position,
  } = furniture;
  return (
    <div className="card bg-green-900 bg-opacity-10 shadow-xl">
      <figure className="h-48">
        <Canvas
          camera={{ position: [0, 0.5, 2.5], fov: 50 }}
          shadows
          style={{
            background:
              "radial-gradient(circle, rgba(120,120,120,1) 0%, rgba(0,0,0,1) 100%)",
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight castShadow position={[1, 1, 1]} intensity={0.7} />
          <pointLight position={[-2, 2, 3]} intensity={0.5} />
          <Environment preset="studio" />
          <FeaturedModel
            modelUrl={modelUrl}
            scale={scale}
            position={position}
          />
          <OrbitControls autoRotate autoRotateSpeed={5} />
        </Canvas>
      </figure>
      <div className="card-body text-green-900">
        <h2 className="card-title">
          {name} <div className="badge badge-error bg-opacity-50">NEW</div>
        </h2>
        <p className="line-clamp-2 text-green-950">{description}</p>
        <div>
          <p className="font-medium">Dimensions:</p>
          <p>{`${length}M X ${width}M X ${height}M`}</p>
        </div>
        <div className="card-actions justify-end">
          <button className="p-2 text-green-900 hover:bg-green-900 hover:bg-opacity-30 rounded-full">
            <Edit className="w-5 h-5" />
          </button>
          <button className="p-2 text-pink-600 hover:bg-pink-900 hover:bg-opacity-30 rounded-full ">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;

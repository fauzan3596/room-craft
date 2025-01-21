import { Canvas } from "@react-three/fiber";
import React from "react";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";



const FurnitureCard = ({ furniture, isFavorite, onFavoriteToggle }) => {
    const navigate = useNavigate();
  return (
    <div className="p-4">
      <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        {/* Bagian kiri: Informasi dan model 3D */}
        <div className="flex flex-[2_2_0px] flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[#897461] text-sm font-normal leading-normal">
              {furniture.category}
            </p>
            <h2 className="text-[#181411] text-base font-bold leading-tight">
              {furniture.name}
            </h2>
          </div>
          {/* Tombol Favorite */}
          <button
            onClick={onFavoriteToggle}
            className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 flex-row-reverse ${
              isFavorite ? "bg-[#ffd700]" : "bg-[#f4f2f0]"
            } text-[#181411] text-sm font-medium leading-normal w-fit`}
          >
            <span className="truncate">
              {isFavorite ? "Favorited" : "Favorite"}
            </span>
          </button>
          <button
            onClick={() => navigate(`/furniture/${furniture.id}`)}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 flex-row-reverse bg-[#f4f2f0] text-[#181411] text-sm font-medium leading-normal w-fit"
          >
            <span className="truncate">View</span>
          </button>
        </div>

        {/* Bagian kanan: Gambar latar */}
        <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1">
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
            <OrbitControls autoRotate autoRotateSpeed={5} />
          </Canvas>
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

export default FurnitureCard;

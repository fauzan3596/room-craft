import { Environment, OrbitControls, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import CanvasLoader from "../room-detail/CanvasLoader";
import FurnitureCardModel from "../room-detail/FurnitureCardModel";

const FurnitureCollectionCard = ({ furniture }) => {
  const { name, position, modelUrl, scale, category } = furniture;

  return (
    <div className="card bg-white">
      <figure className="md:h-60">
        <Canvas
          camera={{ position: [10, 10, 5], fov: 15 }}
          shadows
          frameloop="demand"
          gl={{ preserveDrawingBuffer: true }}
          style={{
            background:
              "radial-gradient(circle, rgba(70,70,70,1) 0%, rgba(0,0,0,1) 100%)",
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight castShadow position={[1, 1, 1]} intensity={0.7} />
          <pointLight position={[-2, 2, 3]} intensity={0.5} />
          <Environment preset="studio" />
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls autoRotate autoRotateSpeed={5} />
            <FurnitureCardModel
              modelUrl={modelUrl}
              scale={scale}
              position={position}
            />
          </Suspense>

          <Preload all />
        </Canvas>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p className="text-[#929092]">{category}</p>
      </div>
    </div>
  );
};

export default FurnitureCollectionCard;

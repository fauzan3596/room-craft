import { Environment, OrbitControls, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import FurnitureCardModel from "./FurnitureCardModel";
import CanvasLoader from "./CanvasLoader";
import { useDispatch } from "react-redux";
import { addedFurnitureToRoom } from "../../../redux/slice/roomSlice";
import { v4 as uuidv } from "uuid";

const FurnitureCardRoom = ({ roomId, furniture }) => {
  const { name, modelUrl, scale, position } = furniture;
  const dispatch = useDispatch();

  const onClickHandler = () => {
    const furnitureToRoom = {
      id: roomId,
      furniture: {
        ...furniture,
        id: uuidv(),
        addedToRoomAt: new Date().toISOString(),
        scale: [1, 1, 1],
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
    };
    dispatch(addedFurnitureToRoom(furnitureToRoom));
  };

  return (
    <div className="card shadow-base-300 shadow-inner">
      <figure className="h-48">
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
        <div className="card-actions w-full">
          <button
            onClick={onClickHandler}
            className="btn bg-green-900 text-white hover:bg-green-700 w-full"
          >
            + Add to Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default FurnitureCardRoom;

import { useGLTF } from "@react-three/drei";
import React from "react";

const FurnitureRoomModel = ({ furniture }) => {
  const { scene } = useGLTF(
    `https://res.cloudinary.com/dlnqwafkc/image/upload/v1736614683/${furniture.modelUrl}.glb`
  );

  const clonedScene = scene.clone();
  clonedScene.scale.set(1, 1, 1);

  return (
    <primitive
      object={clonedScene}
      position={[
        furniture.position[0],
        furniture.position[1],
        furniture.position[2],
      ]}
      rotation={[
        furniture.rotation[0],
        furniture.rotation[1],
        furniture.rotation[2],
      ]}
      castShadow
      receiveShadow
    />
  );
};

export default FurnitureRoomModel;

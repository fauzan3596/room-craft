import { useGLTF } from "@react-three/drei";
import React from "react";

const FurnitureCardModel = ({
  modelUrl,
  scale = [1, 1, 1],
  position = [0, 0, 0],
}) => {
  const { scene } = useGLTF(
    `https://res.cloudinary.com/dlnqwafkc/image/upload/v1736614683/${modelUrl}.glb`
  );

  const clonedScene = scene.clone();
  clonedScene.scale.set(scale[0], scale[1], scale[2]);

  return <primitive object={clonedScene} position={position} />;
};

export default FurnitureCardModel;

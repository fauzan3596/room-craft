import { useGLTF } from "@react-three/drei";
import React from "react";

const FeaturedModel = ({
  modelUrl,
  scale = [1, 1, 1],
  position = [0, 0, 0],
}) => {
  const { scene } = useGLTF(
    `https://res.cloudinary.com/dlnqwafkc/image/upload/v1736614683/${modelUrl}.glb`
  ); 

  scene.scale.set(scale[0], scale[1], scale[2]);
  
  return <primitive object={scene} position={position} />;
};

export default FeaturedModel;

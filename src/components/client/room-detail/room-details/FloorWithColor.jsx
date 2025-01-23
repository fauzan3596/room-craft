import { Plane } from "@react-three/drei";
import React from "react";

const FloorWithColor = ({length, width, currentWallColor}) => {
  return (
    <Plane args={[length, width]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshPhysicalMaterial
        transparent={true}
        opacity={0.3}
        color={currentWallColor}
        reflectivity={0.7}
        ior={1.45}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </Plane>
  );
};

export default FloorWithColor;

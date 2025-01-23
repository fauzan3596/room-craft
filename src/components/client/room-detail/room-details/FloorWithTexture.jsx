import { Plane, useTexture } from "@react-three/drei";
import React from "react";

const FloorWithTexture = ({ length, width, floorTexture }) => {
  const texture = floorTexture ? useTexture(floorTexture) : null;

  return (
    <Plane args={[length, width]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshPhysicalMaterial map={texture} />
    </Plane>
  );
};

export default FloorWithTexture;

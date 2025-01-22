import React from "react";
import * as THREE from "three";

const LeftWallColor = ({ length, width, height, currentWallColor }) => {
  return (
    <mesh
      position={[-length / 2, height / 2, 0]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <boxGeometry args={[width, height, 0.01]} />
      <meshPhysicalMaterial
        transparent={true}
        opacity={0.8}
        reflectivity={0.7}
        ior={1.45}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0}
        color={currentWallColor}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

export default LeftWallColor;

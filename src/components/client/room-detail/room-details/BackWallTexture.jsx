import { useTexture } from "@react-three/drei";
import React from "react";
import * as THREE from "three";

const BackWallTexture = ({ length, width, height, wallTexture }) => {
  const texture = useTexture(wallTexture);
  return (
    <mesh position={[0, height / 2, width / 2]}>
      <boxGeometry args={[length, height, 0.01]} />
      <meshPhysicalMaterial
        transparent={true}
        opacity={0.8}
        reflectivity={0.7}
        ior={1.45}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0}
        map={texture}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

export default BackWallTexture;

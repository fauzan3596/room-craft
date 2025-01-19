import { Plane, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";

const CardCanvas = ({ length, width, height, wallColor }) => {
  return (
    <Canvas
      camera={{
        position: [0, Number(height) / 2, Number(length) * 1.5],
        fov: 50,
      }}
    >
      {/* Cahaya */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={1} />

      {/* Langit */}
      <Sky
        distance={100}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />

      {/* Lantai */}
      <Plane
        args={[Number(length), Number(width)]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <meshPhysicalMaterial
          transparent={true}
          opacity={0.3}
          color={wallColor}
          reflectivity={0.7}
          ior={1.45}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          side={THREE.DoubleSide}
        />
      </Plane>

      {/* Atap */}
      <Plane
        args={[Number(length), Number(width)]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, Number(height), 0]}
        receiveShadow
      >
        <meshPhysicalMaterial
          transparent={true}
          opacity={0.3}
          color={wallColor}
          reflectivity={0.7}
          ior={1.45}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          side={THREE.DoubleSide}
        />
      </Plane>

      {/* Dinding Depan */}
      <mesh position={[0, Number(height) / 2, -Number(width) / 2]}>
        <boxGeometry args={[Number(length), Number(height), 0.01]} />
        <meshPhysicalMaterial
          transparent={true}
          opacity={0.8}
          reflectivity={0.7}
          ior={1.45}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          color={wallColor}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Dinding Belakang */}
      <mesh position={[0, Number(height) / 2, Number(width) / 2]}>
        <boxGeometry args={[Number(length), Number(height), 0.01]} />
        <meshPhysicalMaterial
          transparent={true}
          opacity={0.8}
          reflectivity={0.7}
          ior={1.45}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          color={wallColor}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Dinding Kiri */}
      <mesh
        position={[-Number(length) / 2, Number(height) / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[Number(width), Number(height), 0.01]} />
        <meshPhysicalMaterial
          transparent={true}
          opacity={0.8}
          reflectivity={0.7}
          ior={1.45}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          color={wallColor}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Dinding Kanan */}
      <mesh
        position={[Number(length) / 2, Number(height) / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[Number(width), Number(height), 0.01]} />
        <meshPhysicalMaterial
          transparent={true}
          opacity={0.8}
          reflectivity={0.7}
          ior={1.45}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          color={wallColor}
          side={THREE.BackSide}
        />
      </mesh>

      {/* {furnitures.map((furniture, index) => {
                         return (
                           <Model
                             key={index}
                             furniture={furniture}
                             setFurnitures={setFurnitures}
                             setControlsEnabled={setControlsEnabled}
                           />
                         );
                       })} */}
      {/* <OrbitControls enabled={false} /> */}
    </Canvas>
  );
};

export default CardCanvas;

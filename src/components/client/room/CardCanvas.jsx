import { OrbitControls, Plane, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import React, { Suspense } from "react";
import FurnitureRoomModel from "./FurnitureRoomModel";
import CanvasLoader from "../room-detail/CanvasLoader";
import {
  BackWallColor,
  BackWallTexture,
  FloorWithColor,
  FloorWithTexture,
  FrontWallColor,
  FrontWallTexture,
  LeftWallColor,
  LeftWallTexture,
  RightWallColor,
  RightWallTexture,
} from "../room-detail/room-details";

const CardCanvas = ({
  length,
  width,
  height,
  wallColor,
  furnitures,
  textureWalls,
  textureFloors,
}) => {
  return (
    <Canvas
      camera={{
        position: [0, height * 1.5, length],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
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
        {textureFloors ? (
          <FloorWithTexture
            length={length}
            width={width}
            floorTexture={textureFloors}
          />
        ) : (
          <FloorWithColor
            length={length}
            width={width}
            currentWallColor={wallColor}
          />
        )}

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
        {textureWalls ? (
          <FrontWallTexture
            length={length}
            height={height}
            width={width}
            wallTexture={textureWalls}
          />
        ) : (
          <FrontWallColor
            height={height}
            width={width}
            length={length}
            currentWallColor={wallColor}
          />
        )}

        {/* Dinding Belakang */}
        {textureWalls ? (
          <BackWallTexture
            length={length}
            height={height}
            width={width}
            wallTexture={textureWalls}
          />
        ) : (
          <BackWallColor
            height={height}
            width={width}
            length={length}
            currentWallColor={wallColor}
          />
        )}

        {/* Dinding Kiri */}
        {textureWalls ? (
          <LeftWallTexture
            length={length}
            height={height}
            width={width}
            wallTexture={textureWalls}
          />
        ) : (
          <LeftWallColor
            height={height}
            width={width}
            length={length}
            currentWallColor={wallColor}
          />
        )}

        {/* Dinding Kanan */}
        {textureWalls ? (
          <RightWallTexture
            length={length}
            height={height}
            width={width}
            wallTexture={textureWalls}
          />
        ) : (
          <RightWallColor
            height={height}
            width={width}
            length={length}
            currentWallColor={wallColor}
          />
        )}

        {furnitures.map((furniture, index) => {
          return <FurnitureRoomModel key={index} furniture={furniture} />;
        })}
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={3}
          maxPolarAngle={0.5}
          minPolarAngle={0.5}
        />
      </Suspense>
    </Canvas>
  );
};

export default CardCanvas;

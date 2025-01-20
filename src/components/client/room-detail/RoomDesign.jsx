import { OrbitControls, Plane, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import * as THREE from "three";
import FurnitureInRoomModel from "./FurnitureInRoomModel";
import { useDispatch } from "react-redux";
import { updateRoomState } from "../../../redux/slice/roomSlice";

const RoomDesign = ({ room }) => {
  const {
    id: roomId,
    length,
    width,
    height,
    wallColor,
    furnitures
  } = room;
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [currentWallColor, setCurrentWallColor] = useState(wallColor);
  const dispatch = useDispatch()

  const colorChangeHandler = (e) => {
    setCurrentWallColor(e.target.value)

    const newRoom = {
      ...room,
      wallColor: currentWallColor
    }

    dispatch(updateRoomState(newRoom))
  }

  return (
    <section className="mt-4">
      <div className="flex justify-center">
        <input
          type="color"
          value={currentWallColor}
          onChange={colorChangeHandler}
        />
      </div>
      <div className="h-screen mt-4 drop-shadow-xl">
        <Canvas
          camera={{ position: [0, height / 2, length * 1.5], fov: 50 }}
          className="rounded-3xl mt-4"
        >
          {/* Cahaya */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 10, 5]} intensity={1} />

          {/* Lantai */}
          <Plane
            args={[length, width]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <meshPhysicalMaterial
              transparent={true}
              opacity={0.3} 
              color={currentWallColor} 
              reflectivity={0.7} 
              ior={1.45} 
              roughness={0.1} 
              clearcoat={1} 
              clearcoatRoughness={0} 
              side={THREE.DoubleSide} 
            />
          </Plane>
          <Sky
            distance={100}
            sunPosition={[0, 1, 0]}
            inclination={0}
            azimuth={0.25}
          />

          <Plane
            args={[length, width]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, height, 0]}
            receiveShadow
          >
            <meshPhysicalMaterial
              transparent={true}
              opacity={0.3} 
              color={currentWallColor} 
              reflectivity={0.7} 
              ior={1.45} 
              roughness={0.1} 
              clearcoat={1} 
              clearcoatRoughness={0} 
              side={THREE.DoubleSide} 
            />
          </Plane>

          {/* Dinding Depan */}
          <mesh position={[0, height / 2, -width / 2]}>
            <boxGeometry args={[length, height, 0.01]} />
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

          {/* Dinding Belakang */}
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
              color={currentWallColor}
              side={THREE.BackSide} 
            />
          </mesh>

          {/* Dinding Kiri */}
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

          {/* Dinding Kanan */}
          <mesh
            position={[length / 2, height / 2, 0]}
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

          {/* Contoh Furnitur */}
          {furnitures.map((furniture, index) => {
            return (
              <FurnitureInRoomModel
                key={index}
                furniture={furniture}
                //   setFurnitures={setFurnitures}
                setControlsEnabled={setControlsEnabled}
                roomId={roomId}
              />
            );
          })}
          <OrbitControls enabled={controlsEnabled} />
        </Canvas>
      </div>
    </section>
  );
};

export default RoomDesign;

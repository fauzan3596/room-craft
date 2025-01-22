import { OrbitControls, Plane, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import FurnitureInRoomModel from "./FurnitureInRoomModel";
import { useDispatch } from "react-redux";
import { updateRoomState } from "../../../redux/slice/roomSlice";
import { Camera } from "lucide-react";
import CanvasLoader from "./CanvasLoader";
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
  RoomOptions,
} from "./room-details";

const RoomDesign = ({ room }) => {
  const {
    id: roomId,
    length,
    width,
    height,
    wallColor,
    furnitures,
    textureWalls,
    textureFloors,
  } = room;
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [currentWallColor, setCurrentWallColor] = useState(wallColor);
  const [wallTexture, setWallTexture] = useState(textureWalls);
  const [floorTexture, setFloorTexture] = useState(textureFloors);
  const dispatch = useDispatch();
  const canvasRef = useRef();
  const [image, setImage] = useState(null);

  const handleScreenshot = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    setImage(image);
  };

  useEffect(() => {
    const newRoom = {
      ...room,
      wallColor: currentWallColor,
      textureWalls: wallTexture,
      textureFloors: floorTexture,
    };

    dispatch(updateRoomState(newRoom));
  }, [currentWallColor, wallTexture, floorTexture, dispatch]);

  return (
    <section className="mt-4">
      <div className="h-screen mt-4 drop-shadow-xl">
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, height / 2, length * 1.5], fov: 50 }}
          className="rounded-3xl mt-4"
          gl={{ preserveDrawingBuffer: true }}
        >
          <Suspense fallback={<CanvasLoader />}>
            {/* Cahaya */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 10, 5]} intensity={1} />

            {/* Sky */}
            <Sky
              distance={100}
              sunPosition={[0, 1, 0]}
              inclination={0}
              azimuth={0.25}
            />

            {/* Lantai */}
            {floorTexture ? (
              <FloorWithTexture
                length={length}
                width={width}
                floorTexture={floorTexture}
              />
            ) : (
              <FloorWithColor
                length={length}
                width={width}
                currentWallColor={currentWallColor}
              />
            )}

            {/* Atap */}
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
            {wallTexture ? (
              <FrontWallTexture
                length={length}
                height={height}
                width={width}
                wallTexture={wallTexture}
              />
            ) : (
              <FrontWallColor
                length={length}
                height={height}
                width={width}
                currentWallColor={currentWallColor}
              />
            )}

            {/* Dinding Belakang */}
            {wallTexture ? (
              <BackWallTexture
                length={length}
                width={width}
                height={height}
                wallTexture={wallTexture}
              />
            ) : (
              <BackWallColor
                length={length}
                width={width}
                height={height}
                currentWallColor={currentWallColor}
              />
            )}

            {/* Dinding Kiri */}
            {wallTexture ? (
              <LeftWallTexture
                length={length}
                width={width}
                height={height}
                wallTexture={wallTexture}
              />
            ) : (
              <LeftWallColor
                length={length}
                width={width}
                height={height}
                currentWallColor={currentWallColor}
              />
            )}

            {/* Dinding Kanan */}
            {wallTexture ? (
              <RightWallTexture
                length={length}
                width={width}
                height={height}
                wallTexture={wallTexture}
              />
            ) : (
              <RightWallColor
                length={length}
                width={width}
                height={height}
                currentWallColor={currentWallColor}
              />
            )}

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
          </Suspense>
        </Canvas>
        <button
          onClick={handleScreenshot}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-xl hover:bg-gray-500 hover:text-white"
        >
          <a href={image} download="screenshot.png">
            <Camera className="h-8 w-8 " />
          </a>
        </button>
        <RoomOptions
          currentWallColor={currentWallColor}
          setCurrentWallColor={setCurrentWallColor}
          wallTexture={wallTexture}
          setWallTexture={setWallTexture}
          floorTexture={floorTexture}
          setFloorTexture={setFloorTexture}
        />
      </div>
    </section>
  );
};

export default RoomDesign;

import { useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Euler, Vector3 } from "three";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFurnitureFromRoom,
  fetchRoomSuccess,
  updateFurnitureInRoom,
} from "../../../redux/slice/roomSlice";

const FurnitureInRoomModel = ({ furniture, setControlsEnabled, roomId }) => {
  const { scene } = useGLTF(
    `https://res.cloudinary.com/dlnqwafkc/image/upload/v1736614683/${furniture.modelUrl}.glb`
  );
  const ref = useRef(null);
  const { gl } = useThree();
  const [leftClik, setLeftClik] = useState(false);
  const [rightClick, setRightClick] = useState(false);
  const [position, setPosition] = useState(
    new Vector3(
      furniture.position[0] || 0,
      furniture.position[1] || 0,
      furniture.position[2] || 0
    )
  );
  const [rotation, setRotation] = useState(
    new Euler(
      furniture.rotation[0] || 0,
      furniture.rotation[1] || 0,
      furniture.rotation[2] || 0
    )
  );
  const dispatch = useDispatch();

  const clonedScene = scene.clone();
  clonedScene.scale.set(1, 1, 1);

  const updatedRoom = () => {
    const updatedFurniture = {
      ...furniture,
      position: position.toArray(),
      rotation: rotation.toArray().slice(0, 3),
    };
    dispatch(updateFurnitureInRoom({ roomId, updatedFurniture }));
  };

  const handleDelete = () => {
    const updatedFurniture = {
      ...furniture,
      position: position.toArray(),
      rotation: rotation.toArray().slice(0, 3),
    };
    dispatch(deleteFurnitureFromRoom({ roomId, furniture }));
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setControlsEnabled(false);
    if (e.button === 0) {
      setLeftClik(true);
      setRightClick(false);
    } else if (e.button === 2) {
      setRightClick(true);
      setLeftClik(false);
    }
  };

  const handlePointerUp = () => {
    setLeftClik(false);
    setRightClick(false);
    setControlsEnabled(true);
    updatedRoom();
  };

  const handleKeyDown = (e) => {
    if (leftClik || rightClick) {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault(); // Mencegah scrolling browser
      }
    }

    if (leftClik) {
      setPosition((prev) => {
        switch (e.key) {
          case "ArrowUp": // Move along Z+
            return new Vector3(prev.x, prev.y, prev.z - 0.1);
          case "ArrowDown": // Move along Z-
            return new Vector3(prev.x, prev.y, prev.z + 0.1);
          case "ArrowLeft": // Move along X-
            return new Vector3(prev.x - 0.1, prev.y, prev.z);
          case "ArrowRight": // Move along X+
            return new Vector3(prev.x + 0.1, prev.y, prev.z);
          default:
            return prev;
        }
      });
      if (e.key === "Backspace" || e.key === "Delete") {
        handleDelete();
      }
    }

    if (rightClick) {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        setRotation((prev) => {
          switch (e.key) {
            case "ArrowLeft": // Rotate left
              return new Euler(prev.x, prev.y + 0.05, prev.z);
            case "ArrowRight": // Rotate right
              return new Euler(prev.x, prev.y - 0.05, prev.z);
            default:
              return prev;
          }
        });
      }

      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        setPosition((prev) => {
          switch (e.key) {
            case "ArrowUp": // Move along Y+
              return new Vector3(prev.x, prev.y + 0.1, prev.z);
            case "ArrowDown": // Move along Y-
              return new Vector3(prev.x, prev.y - 0.1, prev.z);
            default:
              return prev;
          }
        });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [rightClick, leftClik]);

  useEffect(() => {
    const preventContextMenu = (e) => e.preventDefault();

    // Mencegah menu konteks untuk semua klik kanan pada canvas
    gl.domElement.addEventListener("contextmenu", preventContextMenu);

    return () => {
      gl.domElement.removeEventListener("contextmenu", preventContextMenu);
    };
  }, [gl.domElement]);

  return (
    <primitive
      object={clonedScene}
      ref={ref}
      position={position.toArray()}
      rotation={rotation.toArray()}
      onPointerDown={handlePointerDown}
      onPointerLeave={() => setControlsEnabled(true)}
      onPointerUp={handlePointerUp}
      castShadow
      receiveShadow
    />
  );
};

export default FurnitureInRoomModel;

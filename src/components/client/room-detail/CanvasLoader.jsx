import { Html } from "@react-three/drei";
import React from "react";

const CanvasLoader = () => {
  return (
    <Html className="w-full h-full !bg-white">
      <div className="-mt-8 -ms-5">
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Html>
  );
};

export default CanvasLoader;

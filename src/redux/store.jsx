import { configureStore } from "@reduxjs/toolkit";
import furnitureSlice from "./slice/furnitureSlice";
import roomSlice from "./slice/roomSlice";

const store = configureStore({
  reducer: {
    furnitures: furnitureSlice,
    rooms: roomSlice,
  },
});

export default store;

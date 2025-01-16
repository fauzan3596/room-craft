import { configureStore } from "@reduxjs/toolkit";
import furnitureSlice from "./slice/furnitureSlice";

const store = configureStore({
  reducer: {
    furnitures: furnitureSlice,
  },
});

export default store;

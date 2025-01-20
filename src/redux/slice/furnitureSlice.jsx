import { createSlice } from "@reduxjs/toolkit";

const furnitureSlice = createSlice({
  name: "furnitures",
  initialState: {
    furnitures: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchFurnitureStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFurnitureFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchFurnitureSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.furnitures = action.payload;
    },
  },
});

export const {
  fetchFurnitureStart,
  fetchFurnitureFailed,
  fetchFurnitureSuccess,
} = furnitureSlice.actions;
export default furnitureSlice.reducer;

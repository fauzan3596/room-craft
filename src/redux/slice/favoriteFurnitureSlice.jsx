import { createSlice } from "@reduxjs/toolkit";

const favoriteFurnitureSlice = createSlice({
  name: "favoriteFurnitures",
  initialState: {
    favoriteFurnitures: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchFavoriteFurnitureStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFavoriteFurnitureFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchFavoriteFurnitureSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.favoriteFurnitures = action.payload;
    },
  },
});

export const {
  fetchFavoriteFurnitureStart,
  fetchFavoriteFurnitureFailed,
  fetchFavoriteFurnitureSuccess,
} = favoriteFurnitureSlice.actions;
export default favoriteFurnitureSlice.reducer;

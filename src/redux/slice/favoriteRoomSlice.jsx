import { createSlice } from "@reduxjs/toolkit";

const favoriteRoomSlice = createSlice({
  name: "favoriteRooms",
  initialState: {
    favoriteRooms: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchFavoriteRoomStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFavoriteRoomFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchFavoriteRoomSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.favoriteRooms = action.payload;
    },
  },
});

export const {
  fetchFavoriteRoomStart,
  fetchFavoriteRoomFailed,
  fetchFavoriteRoomSuccess,
} = favoriteRoomSlice.actions;
export default favoriteRoomSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchRoomStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRoomSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.furnitures = action.payload;
    },
    fetchRoomFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchRoomStart, fetchRoomSuccess, fetchRoomFailed } =
  roomSlice.actions;
export default roomSlice.reducer;

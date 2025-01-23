import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    userStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    userSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    userFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.loading = false;
      state.user = null;
    },
  },
});

export const { userStart, userSuccess, userFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;

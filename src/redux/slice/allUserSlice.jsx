import { createSlice } from "@reduxjs/toolkit";

const allUserSlice = createSlice({
  name: "allUsers",
  initialState: {
    allUsers: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchAllUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAllUserFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAllUserSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.allUsers = action.payload;
    },
  },
});

export const {
  fetchAllUserStart,
  fetchAllUserFailed,
  fetchAllUserSuccess,
} = allUserSlice.actions;
export default allUserSlice.reducer;

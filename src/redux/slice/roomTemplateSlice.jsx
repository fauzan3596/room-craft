import { createSlice } from "@reduxjs/toolkit";

const roomTemplateSlice = createSlice({
  name: "roomTemplates",
  initialState: {
    roomTemplates: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchRoomTemplateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRoomTemplateFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchRoomTemplateSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.roomTemplates = action.payload;
    },
  },
});

export const {
  fetchRoomTemplateStart,
  fetchRoomTemplateFailed,
  fetchRoomTemplateSuccess,
} = roomTemplateSlice.actions;
export default roomTemplateSlice.reducer;

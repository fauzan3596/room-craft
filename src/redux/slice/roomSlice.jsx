import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv } from "uuid";

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
      state.rooms = action.payload;
    },
    fetchRoomFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateRoomState: (state, action) => {
      state.rooms = state.rooms.map((room) =>
        room.id === action.payload.id ? action.payload : room
      );
    },
    addedFurnitureToRoom: (state, action) => {
      const { id, furniture } = action.payload;
      state.rooms = state.rooms.map((room) =>
        room.id === id
          ? {
              ...room,
              furnitures: room.furnitures
                ? [...room.furnitures, furniture]
                : [furniture],
            }
          : room
      );
    },
    updateFurnitureInRoom: (state, action) => {
      const { roomId, updatedFurniture } = action.payload;
      state.rooms = state.rooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              furnitures: room.furnitures.map((furniture) =>
                furniture.id === updatedFurniture.id
                  ? updatedFurniture
                  : furniture
              ),
            }
          : room
      );
    },
    deleteFurnitureFromRoom: (state, action) => {
      const { roomId, furniture } = action.payload;
      state.rooms = state.rooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              furnitures: room.furnitures.filter(
                (f) => f.id !== furniture.id
              ),
            }
          : room
      );
    },
  },
});

export const {
  fetchRoomStart,
  fetchRoomSuccess,
  fetchRoomFailed,
  updateRoomState,
  addedFurnitureToRoom,
  updateFurnitureInRoom,
  deleteFurnitureFromRoom,
} = roomSlice.actions;
export default roomSlice.reducer;

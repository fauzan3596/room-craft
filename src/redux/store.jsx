import { configureStore } from "@reduxjs/toolkit";
import furnitureSlice from "./slice/furnitureSlice";
import roomSlice from "./slice/roomSlice";
import favoriteRoomSlice from "./slice/favoriteRoomSlice";
import favoriteFurnitureSlice from "./slice/favoriteFurnitureSlice";
import roomTemplateSlice from "./slice/roomTemplateSlice";
import userSlice from "./slice/userSlice";
import allUserSlices from "./slice/allUserSlice";

const store = configureStore({
  reducer: {
    furnitures: furnitureSlice,
    rooms: roomSlice,
    favoriteRooms: favoriteRoomSlice,
    favoriteFurnitures: favoriteFurnitureSlice,
    roomTemplates: roomTemplateSlice,
    user: userSlice,
    allUsers: allUserSlices,
  },
});

export default store;

import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllFavoriteFurnitures,
  fetchAllFavoriteRooms,
  fetchAllFurnitures,
  fetchAllRooms,
} from "./services/fetchApi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchRoomFailed,
  fetchRoomStart,
  fetchRoomSuccess,
} from "./redux/slice/roomSlice";
import {
  fetchFurnitureFailed,
  fetchFurnitureStart,
  fetchFurnitureSuccess,
} from "./redux/slice/furnitureSlice";
import {
  fetchFavoriteRoomFailed,
  fetchFavoriteRoomStart,
  fetchFavoriteRoomSuccess,
} from "./redux/slice/favoriteRoomSlice";
import { fetchFavoriteFurnitureFailed, fetchFavoriteFurnitureStart, fetchFavoriteFurnitureSuccess } from "./redux/slice/favoriteFurnitureSlice";

function App() {
  const dispatch = useDispatch();
  const {
    data: rooms,
    isLoading: isRoomsLoading,
    isError: isRoomsError,
    error: roomsError,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: fetchAllRooms,
  });

  useEffect(() => {
    dispatch(fetchRoomStart());
    if (isRoomsError) {
      dispatch(fetchRoomFailed(roomsError.message));
    } else if (rooms) {
      dispatch(fetchRoomSuccess(rooms));
    }
  }, [rooms, isRoomsError, roomsError, dispatch]);

  const {
    data: furnitures,
    isLoading: isFurnituresLoading,
    isError: isFurnituresError,
    error: furnituresError,
  } = useQuery({
    queryKey: ["furnitures"],
    queryFn: fetchAllFurnitures,
  });

  useEffect(() => {
    dispatch(fetchFurnitureStart());
    if (isFurnituresError) {
      dispatch(fetchFurnitureFailed(furnituresError.message));
    } else if (furnitures) {
      dispatch(fetchFurnitureSuccess(furnitures));
    }
  }, [furnitures, isFurnituresError, furnituresError, dispatch]);

  const {
    data: favoriteRooms,
    isLoading: isfavoriteRoomsLoading,
    isError: isfavoriteRoomsError,
    error: favoriteRoomsError,
  } = useQuery({
    queryKey: ["favoriteRooms"],
    queryFn: fetchAllFavoriteRooms,
  });

  useEffect(() => {
    dispatch(fetchFavoriteRoomStart());
    if (isfavoriteRoomsError) {
      dispatch(fetchFavoriteRoomFailed(favoriteRoomsError.message));
    } else if (favoriteRooms) {
      dispatch(fetchFavoriteRoomSuccess(favoriteRooms));
    }
  }, [favoriteRooms, isfavoriteRoomsError, favoriteRoomsError, dispatch]);

  const {
    data: favoriteFurnitures,
    isLoading: isfavoriteFurnituresLoading,
    isError: isfavoriteFurnituresError,
    error: favoriteFurnituresError,
  } = useQuery({
    queryKey: ["favoriteFurnitures"],
    queryFn: fetchAllFavoriteFurnitures,
  });

  useEffect(() => {
    dispatch(fetchFavoriteFurnitureStart());
    if (isfavoriteFurnituresError) {
      dispatch(fetchFavoriteFurnitureFailed(favoriteFurnituresError.message));
    } else if (favoriteFurnitures) {
      dispatch(fetchFavoriteFurnitureSuccess(favoriteFurnitures));
    }
  }, [favoriteFurnitures, isfavoriteFurnituresError, favoriteFurnituresError, dispatch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

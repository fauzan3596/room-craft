import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Loading, Navbar } from "../components";
import { useQuery } from "@tanstack/react-query";
import { fetchAllFurnitures } from "../services/fetchApi";
import {
  fetchFurnitureSuccess,
  fetchFurnitureFailed,
  fetchFurnitureStart,
} from "../redux/slice/furnitureSlice";

const AdminLayout = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const pathname = useLocation();
  const dispatch = useDispatch();

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

  const displayWindowSize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", displayWindowSize);
    return () => window.removeEventListener("resize", displayWindowSize);
  }, []);

  useEffect(() => {
    if (screenWidth < 1024) {
      setIsNavbarOpen(false);
    } else {
      setIsNavbarOpen(true);
    }
  }, [screenWidth]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex">
      <Navbar isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />
      <div
        className={`${
          isNavbarOpen && "lg:ps-64 ps-20"
        } ps-20 min-h-screen w-full transition-all duration-300 ease-in-out bg-white`}
      >
        {isNavbarOpen && screenWidth < 1024 && (
          <div
            className="inset-0 bg-black bg-opacity-30 transition-opacity z-20 h-screen w-full fixed"
            onClick={() => setIsNavbarOpen(false)}
          ></div>
        )}
        {isFurnituresLoading ? <Loading /> : <Outlet />}
      </div>
    </div>
  );
};

export default AdminLayout;

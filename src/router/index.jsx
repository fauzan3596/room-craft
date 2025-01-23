import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../layouts";
import {
  AddDataPage,
  AddRoomPage,
  AdminHomePage,
  DetailRoomPage,
  EditDataPage,
  ErrorAdminPage,
  FurnitureDetail,
  FurniturePage,
  LandingPage,
  LoginForm,
  MasterDataPage,
  RegisterForm,
  RoomPage,
  TemplateRoomPage,
  UserDataPage,
  FavoritesPage
} from "../pages";
import UserLayout from "../layouts/userLayout";
import AboutPage from "../pages/AboutPage";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <RegisterForm /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <AdminHomePage />,
      },
      {
        path: "master-data",
        element: <MasterDataPage />,
      },
      {
        path: "master-data/add",
        element: <AddDataPage />,
      },
      {
        path: "user-data",
        element: <UserDataPage />,
      },
      {
        path: "master-data/edit/:id",
        element: <EditDataPage />,
      },
      {
        path: "*",
        element: <ErrorAdminPage />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "room",
        element: <RoomPage />,
      },
      {
        path: "room/add-room",
        element: <AddRoomPage />,
      },
      {
        path: "room/detail/:id",
        element: <DetailRoomPage />,
      },
      {
        path: "room/template-room",
        element: <TemplateRoomPage />,
      },
      {
        path: "furniture",
        element: <FurniturePage />,
      },
      {
        path: "furniture/:id",
        element: <FurnitureDetail />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
]);

export default router;

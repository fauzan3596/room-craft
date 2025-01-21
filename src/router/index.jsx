import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../layouts";
import {
  AddDataPage,
  AddRoomPage,
  AdminHomePage,
  DetailRoomPage,
  EditDataPage,
  ErrorAdminPage,
  LandingPage,
  LoginForm,
  MasterDataPage,
  RegisterForm,
  RoomPage,
  TemplateRoomPage,
  UserDataPage,
} from "../pages";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <RegisterForm /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminHomePage />,
      },
      {
        path: "/admin/master-data",
        element: <MasterDataPage />,
      },
      {
        path: "/admin/master-data/add",
        element: <AddDataPage />,
      },
      {
        path: "/admin/user-data",
        element: <UserDataPage />,
      },
      {
        path: "/admin/master-data/edit/:id",
        element: <EditDataPage />,
      },
      {
        path: "*",
        element: <ErrorAdminPage />,
      },
    ],
  },
  {
    path: "/room",
    element: <RoomPage />,
  },
  {
    path: "/room/add-room",
    element: <AddRoomPage />,
  },
  {
    path: "/room/detail/:id",
    element: <DetailRoomPage />,
  },
  {
    path: "/room/template-room",
    element: <TemplateRoomPage />,
  },
]);

export default router;

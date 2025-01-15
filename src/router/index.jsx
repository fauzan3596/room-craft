import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../layouts";
import { AdminHomePage, MasterDataPage, UserDataPage } from "../pages";

const router = createBrowserRouter([
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
      },{
        path: "/admin/user-data",
        element: <UserDataPage />,
      },
    ],
  },
]);

export default router
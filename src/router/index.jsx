import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../layouts";
import { AdminHomePage } from "../pages";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminHomePage />,
      },
    ],
  },
]);

export default router
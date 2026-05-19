import { createBrowserRouter, Navigate } from "react-router";
import { LoginPage, DashboardPage } from "../pages";
import { authMiddleware, checkExistMiddleware } from "../middleware";
import { PrivateLayout } from "../components/layouts";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        Component: LoginPage,
        middleware: [checkExistMiddleware],
      },
      {
        path: "dashboard",
        Component: PrivateLayout,
        middleware: [authMiddleware],
        children: [
          {
            index: true,
            Component: DashboardPage,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

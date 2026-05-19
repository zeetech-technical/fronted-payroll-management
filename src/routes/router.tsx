import { createBrowserRouter } from "react-router";
import { LoginPage, DashboardPage } from "../pages";
import { authMiddleware, checkExistMiddleware } from "../middleware";

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
        Component: DashboardPage,
        middleware: [authMiddleware],
      },
    ],
  },
]);

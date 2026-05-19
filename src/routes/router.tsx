import { createBrowserRouter } from "react-router";
import { LoginPage, DashboardPage } from "../pages";
import { authMiddleware } from "../middleware";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        Component: LoginPage,
      },
      {
        path: "dashboard",
        Component: DashboardPage,
        middleware: [authMiddleware]
      },
    ],
  },
]);

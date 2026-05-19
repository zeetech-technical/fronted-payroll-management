import { createBrowserRouter } from "react-router";
import { LoginPage, DashboardPage } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "dashboard",
        Component: DashboardPage,
      },
    ],
  },
]);

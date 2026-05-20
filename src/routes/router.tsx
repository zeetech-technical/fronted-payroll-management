import { createBrowserRouter, Navigate } from "react-router";
import { authMiddleware, checkExistMiddleware } from "../middleware";
import { PrivateLayout } from "../components/layouts";
import {
  CatalogPage,
  DashboardPage,
  LoginPage,
  PositionPage,
  TypeCatalogPage,
  UsersPage,
} from "../pages";
import { TabuladorPage } from "../pages/dashboard/tabulador/tabulador.page";
import { useCatalogStore, useUserStore } from "../store";

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
          {
            path: "catalog",
            loader: async () => {
              const { getTypeCatalogs, getCatalogs } =
                useCatalogStore.getState();
              await getTypeCatalogs();
              await getCatalogs();
            },
            children: [
              {
                path: "",
                Component: CatalogPage,
              },
              {
                path: "type-catalog",
                Component: TypeCatalogPage,
              },
            ],
          },
          {
            path: "users",
            Component: UsersPage,
            loader: async () => {
              const { getUsers } = useUserStore.getState();
              await getUsers();
            },
          },
          {
            path: "tabulador",
            Component: TabuladorPage,
          },
          {
            path: "positions",
            Component: PositionPage,
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

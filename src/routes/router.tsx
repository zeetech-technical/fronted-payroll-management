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
import {
  useCatalogStore,
  usePositionStore,
  useTabuladorStore,
  useUserStore,
} from "../store";
import { permissionMiddleware } from "../middleware/permission.middleware";

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
            middleware: [permissionMiddleware("DASHBOARD:CATALOGS")],
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
            middleware: [permissionMiddleware("DASHBOARD:USERS")],
            Component: UsersPage,
            loader: async () => {
              const { getUsers } = useUserStore.getState();
              await getUsers();
            },
          },
          {
            path: "tabulador",
            middleware: [permissionMiddleware("DASHBOARD:TABULADOR")],
            Component: TabuladorPage,
            loader: async () => {
              const { getCatalogs } = useCatalogStore.getState();
              const { getTabuladores } = useTabuladorStore.getState();
              const { getPositions } = usePositionStore.getState();
              await getCatalogs();
              await getTabuladores();
              await getPositions();
            },
          },
          {
            path: "positions",
            middleware: [permissionMiddleware("DASHBOARD:POSITION")],
            Component: PositionPage,
            loader: async () => {
              const { getPositions } = usePositionStore.getState();
              await getPositions();
            },
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

import { redirect } from "react-router";
import { useAuthStore } from "../store";

export const permissionMiddleware =
  (...requiredPermissions) =>
  async () => {
    const { permissions } =
      useAuthStore.getState();

    const hasPermission =
      requiredPermissions.some((permission) =>
        permissions.includes(permission)
      );

    if (!hasPermission) {
      throw redirect("/403");
    }

    return null;
  };
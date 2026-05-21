import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { IRquestFieldSignIn } from "../interfaces/fields";
import { AuthService } from "../services";

export interface AuthState {
  status: "authorized" | "unauthrized" | "pending";
  token?: string;
  user?: any;
  permissions: any[];
  signIn: (fields: IRquestFieldSignIn) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  logoutUser: () => void;
  meUser: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

export const storeAuthApi: StateCreator<AuthState> = (set) => ({
  status: "pending",
  token: undefined,
  user: undefined,
  permissions: [],

  signIn: async (fields: IRquestFieldSignIn) => {
    try {
      const token = await AuthService.signIn(fields);
      set({ status: "authorized", token });
    } catch (error) {
      set({ status: "unauthrized", token: undefined, user: undefined });
      throw new Error("unauthrized");
    }
  },

  checkAuthStatus: async () => {
    try {
      //   const { token, ...user } = await AuthService.checkStatus();
      //   set({ status: "authorized", token, user });
    } catch (error) {
      set({ status: "unauthrized", token: undefined, user: undefined, permissions: [] });
      throw new Error("unauthrized");
    }
  },

  logoutUser: () => {
    set({ status: "unauthrized", token: undefined, user: undefined, permissions: [] });
  },

  meUser: async () => {
    try {
      const user = await AuthService.me();

      const rolePermissions =
        user?.roles?.flatMap((role) => role.permissions.map((p) => p.slug)) ||
        [];

      const directPermissions = user?.permissions?.map((p) => p.slug) || [];

      const permissions = [
        ...new Set([...rolePermissions, ...directPermissions]),
      ];

      set({ user, permissions });
    } catch (error) {
      set({ status: "unauthrized", token: undefined, user: undefined });
      throw new Error("unauthrized");
    }
  },

  hasPermission: (permission: string) => {
    const permissions = useAuthStore.getState().permissions;
    return permissions.includes(permission);
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(storeAuthApi, {
      name: "auth-storage",
    }),
  ),
);

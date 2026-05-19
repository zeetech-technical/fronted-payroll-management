import { create ,type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { IRquestFieldSignIn } from "../interfaces/fields";
import { AuthService } from "../services";



export interface AuthState {
  status: "authorized" | "unauthrized" | "pending";
  token?: string;
  user?: any;
  signIn: (fields:IRquestFieldSignIn) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  logoutUser: () => void;
  meUser: () => Promise<void>;
}

export const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",
  token: undefined,
  user: undefined,

  signIn: async (fields:IRquestFieldSignIn) => {
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
      set({ status: "unauthrized", token: undefined, user: undefined });
      throw new Error("unauthrized");
    }
  },

  logoutUser: () => {
    set({ status: "unauthrized", token: undefined, user: undefined });
  },

  meUser: async () => {
    try {
     
    } catch (error) {
     
    }
  },
});


export const useAuthStore = create<AuthState>()(
  devtools(
    persist(storeApi, {
      name: 'auth-storage',
    }),
  ),
)
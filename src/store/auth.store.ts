import { create ,type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
  status: "authorized" | "unauthrized" | "pending";
  token?: string;
  user?: any;
  loginUser: (email: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  logoutUser: () => void;
}

export const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {
    try {
    //   const { token, ...user } = await AuthService.login(email, password);
    //   set({ status: "authorized", token, user });
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
});


export const useAuthStore = create<AuthState>()(
  devtools(
    persist(storeApi, {
      name: 'auth-storage',
    }),
  ),
)
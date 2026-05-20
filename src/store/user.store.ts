import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { UserService } from "../services/users.service";

export interface UserState {
    users: any[]
    getUsers: () => Promise<void>
}

export const storeUserApi: StateCreator<UserState> = (set) => ({
    users: [],
    getUsers: async () => {
        try {
            const users = await UserService.getUsers();
            set({ users });
        } catch (error) {
            set({ users: [] });
            throw new Error("Error al obtener usuarios");
        }
    }
});

export const useUserStore = create<UserState>()(devtools(storeUserApi));
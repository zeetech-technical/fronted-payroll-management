import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { UserService } from "../services/users.service";

export interface UserState {
    users: any[]
    roles: any[];
    getUsers: () => Promise<void>
    selectRoles: () => Promise<void>
    createUser: (data: any) => Promise<void>;
}

export const storeUserApi: StateCreator<UserState> = (set) => ({
    users: [],
    roles: [],
    getUsers: async () => {
        try {
            const users = await UserService.getUsers();
            set({ users });
        } catch (error) {
            set({ users: [] });
            throw new Error("Error al obtener usuarios");
        }
    },
    selectRoles: async () => {
        try {
            const roles = await UserService.selectRoles();
            set({ roles });
        } catch (error) {
            set({ roles: [] });
            throw new Error("Error al obtener roles");
        }
    },
    createUser: async (data: any) => {
        try {
            const resp = await UserService.createUser(data);
            const user = resp.data;
            set((state) => ({ users: [...state.users, user] }));
        } catch (error) {
            throw new Error("Error al crear usuario");
        }
    }
});

export const useUserStore = create<UserState>()(devtools(storeUserApi));
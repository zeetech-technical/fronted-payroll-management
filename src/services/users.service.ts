import { AxiosError } from "axios";
import payrollApi from "../api/payroll.api";
import { ToastHelper } from "../helpers";

export class UserService {
    static async getUsers() {
        try {
            const { data: resp } = await payrollApi.get("/users");
            return resp.data;
        } catch (error: AxiosError | any) {
            let msg =
                error.response.data.data.message || "Error al Intentar Obtener los Usuarios";
            ToastHelper({ message: msg, type: "error" });
        }
    }
    static async selectRoles() {
        try {
            const { data: resp } = await payrollApi.get("/roles");
            return resp.data;
        } catch (error: AxiosError | any) {
            let msg =
                error.response.data.data.message || "Error al Intentar Obtener los Roles";
            ToastHelper({ message: msg, type: "error" });
        }
    }
    static async createUser(data: any) {
        try {
            const { data: resp } = await payrollApi.post("/users", data);
            ToastHelper({ message: "Usuario creado exitosamente", type: "success" });
            return resp;
        } catch (error: AxiosError | any) {
            let msg =
                error.response.data.data.message || "Error al Intentar Crear el Usuario";
            ToastHelper({ message: msg, type: "error" });
        }
    }
    static async assignPosition(data: any) {
        try {
            const { data: resp } = await payrollApi.post("/users/assign-position", data);
            ToastHelper({ message: "Posición asignada exitosamente", type: "success" });
            return resp.data;
        } catch (error: AxiosError | any) {
            let msg =
                error.response.data.data.message || "Error al Intentar Asignar la Posición";
            ToastHelper({ message: msg, type: "error" });
        }
    }
}
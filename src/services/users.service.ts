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
}
import type { AxiosError } from "axios";
import payrollApi from "../api/payroll.api";
import { ToastHelper } from "../helpers";
import type { IRquestFieldSignIn } from "../interfaces/fields";

export class AuthService {
  static async signIn(fields: IRquestFieldSignIn) {
    try {
      const { data: resp } = await payrollApi.post<{
        data: { "access-token": string };
      }>("/auth/sign-in", fields);

      return resp.data["access-token"];
    } catch (error: AxiosError | any) {
      let msg =
        error.response.data.data.message || "Error al Intentar Iniciar Sesion";
      ToastHelper({ message: msg, type: "error" });
    }
  }

  static async me(){
    try {
      const {data: resp} = await payrollApi.get("/auth/me")
      return resp.data
    } catch (error: AxiosError | any) {
      let msg =
        error.response.data.data.message || "Error al Intentar Obtener Datos";
      ToastHelper({ message: msg, type: "error" });
    }
  }
}

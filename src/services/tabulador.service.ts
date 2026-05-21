import payrollApi from "../api/payroll.api";
import { ToastHelper } from "../helpers";

export class TabuladorService {
  static async getAllTabulador() {
    try {
      const { data } = await payrollApi.get("/tabulador");
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async createTabuladorConfig(data: any) {
    try {
      await payrollApi.post("/tabulador/config", { concepts: data });
      ToastHelper({
        message: "Tabulador creado exitosamente",
        type: "success",
      });
    } catch (error) {
      throw error;
    }
  }
}

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
      const resp = await payrollApi.post("/tabulador/config", {
        concepts: data,
      });
      ToastHelper({
        message: "Tabulador creado exitosamente",
        type: "success",
      });
      return resp.data.data;
    } catch (error) {
      throw error;
    }
  }

  static async getTabuladorAllStats() {
    try {
      const { data } = await payrollApi.get("/tabulador/stats");
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async getTabuladorUserStats() {
    try {
      const { data } = await payrollApi.get("/tabulador/user-stats");
      return data.data;
    } catch (error) {
      throw error;
    }
  }
}

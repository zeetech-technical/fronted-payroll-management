import payrollApi from "../api/payroll.api";
import { ToastHelper } from "../helpers";

export class PositionService {
  static async getAllPositions() {
    const response = await payrollApi.get("/positions");
    return response.data;
  }

  static async createPosition(data: any) {
    try {
      const response = await payrollApi.post("/positions", data);
      ToastHelper({
        message: "Puesto agregado exitosamente",
        type: "success",
      });
      return response.data;
    } catch (error) {}
  }
}

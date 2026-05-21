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
  static async deletePosition(id: number) {
    try {
      await payrollApi.delete(`/positions/${id}`);
      ToastHelper({
        message: "Puesto eliminado exitosamente",
        type: "success",
      });
    } catch (error) {}
  }
  static async restorePosition(id: number) {
    try {
      await payrollApi.put(`/positions/${id}/restore`);
      ToastHelper({
        message: "Puesto restaurado exitosamente",
        type: "success",
      });
    } catch (error) {}
  }

  static async assignToTab(data: any) {
    try {
     const resp = await payrollApi.post("/positions/assign-to-tab", data);
      ToastHelper({
        message: "Puesto asignado exitosamente",
        type: "success",
      });
      return resp.data;
    } catch (error) {}
  }

  static async selectPositionToTab() {
    try {
      const response = await payrollApi.get("/positions/select-position");
      return response.data;
    } catch (error) {}
  }

  static async selectPositionUserAvailable() {
    try {
      const response = await payrollApi.get("/positions/select-position-user");
      return response.data;
    } catch (error) {}
  }
}

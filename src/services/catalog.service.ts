import { AxiosError } from "axios";
import payrollApi from "../api/payroll.api";
import { ToastHelper } from "../helpers";

export class CatalogService {
  static async getTypeCatalogs() {
    try {
      const { data: resp } = await payrollApi.get("/catalogs/types");
      return resp.data;
    } catch (error: AxiosError | any) {
      let msg =
        error.response.data.data.message ||
        "Error al Intentar Obtener los Tipos de Catálogos";
      ToastHelper({ message: msg, type: "error" });
    }
  }

  static async getCatalogs() {
    try {
      const { data: resp } = await payrollApi.get("/catalogs");
      return resp.data;
    } catch (error: AxiosError | any) {
      let msg =
        error.response.data.data.message ||
        "Error al Intentar Obtener los Catálogos";
      ToastHelper({ message: msg, type: "error" });
    }
  }

  static async addCatalog(catalog: any) {
    try {
      const { data: resp } = await payrollApi.post("/catalogs", catalog);
      return resp.data;
    } catch (error: AxiosError | any) {
      let msg =
        error.response.data.data.message ||
        "Error al Intentar Agregar el Catálogo";
      ToastHelper({ message: msg, type: "error" });
    }
  }
  static async deleteCatalog(id: number) {
    try {
      const { data: resp } = await payrollApi.delete(`/catalogs/${id}`);
      return resp.data;
    } catch (error: AxiosError | any) {
      let msg =
        error.response.data.data.message ||
        "Error al Intentar Eliminar el Catálogo";
      ToastHelper({ message: msg, type: "error" });
    }
  }
  static async restoreCatalog(id: number) {
    try {
      await payrollApi.put(`/catalogs/${id}/restore`);
      return true;
    } catch (error: AxiosError | any) {
      let msg =
        error.response.data.data.message ||
        "Error al Intentar Restaurar el Catálogo";
      ToastHelper({ message: msg, type: "error" });
    }
  }
}

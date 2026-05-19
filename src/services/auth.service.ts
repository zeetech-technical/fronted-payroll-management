import payrollApi from "../api/payroll.api";

export class AuthService {
  static async login(email: string, password: string) {
    try {
      const { data } = await payrollApi.post("/auth/sign-in", { email, password });
      return data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
}
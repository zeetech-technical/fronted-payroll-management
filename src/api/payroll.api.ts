import axios from "axios";
import { useAuthStore } from "../store";


const payrollApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

//interceptor
payrollApi.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default payrollApi;
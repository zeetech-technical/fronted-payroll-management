import axios from "axios";
import { useAuthStore } from "../store";

const isTokenExpired = (token: string) => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp * 1000 < Date.now();
};

const payrollApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

//interceptor
payrollApi.interceptors.request.use((config) => {
  const { token, logoutUser } = useAuthStore.getState();

  if (token) {
    if (isTokenExpired(token)) {
      logoutUser();
      window.location.href = "/login";
      return Promise.reject("Token expirado");
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


payrollApi.interceptors.response.use(

  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logoutUser()
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
export default payrollApi;
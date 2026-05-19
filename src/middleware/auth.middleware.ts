import { redirect, replace } from "react-router";
import { useAuthStore } from "../store";

export const authMiddleware = () => {
  const { token } = useAuthStore.getState();
  if (!token) {
    throw redirect("/");
  }
}

export const checkExistMiddleware = () => {
   const { token } = useAuthStore.getState();
   
  if (token) {
    return redirect("/dashboard");
  }
  return null;
};

// Evita que usuarios anónimos entren al dashboard
export const dashboardLoader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }
  return null;
};
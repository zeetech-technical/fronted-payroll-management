import { toast } from "react-toastify";

export const ToastHelper = ({ message, type }: ToastProps) => {
  const toastConfig = {
    theme: "colored",
    type: "success",
  };

  return toast(message, { ...toastConfig, type });
};

type ToastProps = {
  message: string;
  type: "success" | "error" | "warning" | "info";
};

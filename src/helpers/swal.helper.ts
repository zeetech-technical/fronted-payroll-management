import Swal from "sweetalert2";

interface SwalHelper {
  title: string;
  text: string;
  icon: "success" | "error" | "warning" | "info";
  confirmText: string;
  cancelText: string;
  accion: () => void;
}

export const SwalHelper = async ({
  title,
  text,
  icon,
  confirmText,
  cancelText,
  accion,
}: SwalHelper) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  }).then((result) => {
    if (result.isConfirmed) {
      accion();
    }
  });
};



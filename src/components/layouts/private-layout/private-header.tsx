import { useAuthStore } from "../../../store";
import { useNavigate } from "react-router";
import { CiLogout } from "react-icons/ci";
import { SwalHelper } from "../../../helpers";

export const PrivateHeader = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logoutUser);
  const user = useAuthStore((state) => state.user);

  const initial = user?.name.charAt(0).toUpperCase() || "U";

  const onLogout = () => {
    SwalHelper({
      title: "¿Estás seguro?",
      text: "Se cerrará la sesión",
      icon: "warning",
      confirmText: "Sí, cerrar sesión",
      cancelText: "Cancelar",
      accion: () => {
        logout();
        navigate("/login");
      },
    });
  };

  return (
    <header className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-4 w-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">
          {initial}
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-white font-semibold">
            {user?.fullname || "Usuario"}
          </span>

          <span className="text-white/60 text-sm">
            {user?.roles[0].name || "worker"}
          </span>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="p-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition cursor-pointer"
      >
        <CiLogout size={25} />
      </button>
    </header>
  );
};

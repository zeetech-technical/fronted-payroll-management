import { useAuthStore } from "../../../store";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'

// const user = {
//   name: "User",
//   role: "worker",
// }

export const PrivateHeader = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logoutUser)
  const user = useAuthStore((state) => state.user)

  const initial = user?.name.charAt(0).toUpperCase() || "U";

  const onLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se cerrará la sesión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        navigate('/login');
      }
    })
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
        className="px-4 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition"
      >
        Cerrar sesión
      </button>
    </header>
  );
};

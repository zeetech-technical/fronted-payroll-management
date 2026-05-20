import { NavLink } from "react-router";

export const PrivateAside = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-teal-600 text-white"
        : "text-white/70 hover:bg-white/10 hover:text-white"
    }`;
  return (
    <aside className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-4 w-64">
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" className={linkClass}>
          Home
        </NavLink>
        
        <NavLink to="/usuarios" className={linkClass}>
          Usuarios
        </NavLink>

        <NavLink to="/tabulador" className={linkClass}>
          Tabulador
        </NavLink>

        <NavLink to="/catalogos" className={linkClass}>
          Catálogos
        </NavLink>

        <NavLink to="/puestos" className={linkClass}>
          Puestos
        </NavLink>

        <NavLink to="/percepciones" className={linkClass}>
          Percepciones
        </NavLink>
      </nav>
    </aside>
  );
};

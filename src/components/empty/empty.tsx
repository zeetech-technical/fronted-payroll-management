import { FaBoxOpen } from "react-icons/fa6";
export const Empty = ({ title = "No hay registros disponibles", subtitle = "Prueba agregando un nuevo elemento presionando el botón superior." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-8 text-center animate-fade-in">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-4">
        <FaBoxOpen size={40} className="text-gray-400" />
      </div>

      <h3 className="text-base font-medium text-gray-600 mb-1">{title}</h3>

      <p className="text-sm text-gray-400 max-w-xs">
       {subtitle}
      </p>
    </div>
  );
};

import { useState } from "react";
import { useFormContext, type FieldError } from "react-hook-form";
import type { IFieldPasswordProps } from "../../../interfaces/fields";


export const FieldPassword = ({
  label,
  name,
  placeholder,
  required,
  visible,
  darkMode = true,
}: IFieldPasswordProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError;
  const [showPassword, setShowPassword] = useState(visible);
  const baseClass = [
    "w-full px-4 py-3 border rounded-xl placeholder:text-gray-400",
    "focus:outline-none focus:ring-2",
    error
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300 focus:ring-blue-500",
    darkMode ? "text-white" : "text-dark",
  ].join(" ");

  const baseLabelClass = darkMode ? "text-white" : "text-dark";
  return (
    <div>
      <label className={`block mb-2 font-medium ${baseLabelClass}`}>
        {required ? <span className="text-red-500">*</span> : ""} {label}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={baseClass}
        {...register(name, {
          required: required ? `${label} es obligatorio` : false,
        })}
      />
      {error && <span className="text-red-500">{error.message}</span>}

      <div className="flex items-center gap-2 mt-2 mb-10">
        <input
          className="cursor-pointer"
          type="checkbox"
          checked={showPassword}
          onChange={(e) => setShowPassword(e.target.checked)}
        />
        <span className="text-white text-sm">
          {showPassword ? "Ocultar" : "Mostrar"} contraseña
        </span>
      </div>
    </div>
  );
};

import { useFormContext, type FieldError } from "react-hook-form";
import type { IFieldSelectProps } from "../../../interfaces/fields";

export const FieldSelect = ({
  label,
  name,
  options,
  required,
  darkMode = true,
}: IFieldSelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError;

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
        {required && <span className="text-red-500">*</span>} {label}
      </label>

      <select
        className={baseClass}
        defaultValue={options.length > 0 ? options[0].value : ""}
        {...register(name, {
          required: required ? `${label} es obligatorio` : false,
        })}
      >
        {options.length > 0 ? (
          options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-black"
            >
              {option.label}
            </option>
          ))
        ) : (
          <option value="" disabled className="text-black">
            Sin opciones disponibles
          </option>
        )}
      </select>

      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

import { useFormContext, type FieldError } from "react-hook-form";

interface IFieldTextProps {
  name: string;
  placeholder: string;
  label: string;

  required?: boolean;
  readonly?: boolean;
  hidden?: boolean;
}

export const FieldText = ({
  label,
  name,
  placeholder,
  required,
}: IFieldTextProps) => {
 
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError;

const baseClass = [
  "w-full px-4 py-3 border rounded-xl",
  "focus:outline-none focus:ring-2",
  error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300 focus:ring-blue-500",
].join(" ");
  return (
    <div>
      <label className="block text-gray-700 mb-2 font-medium">{required ? <span className="text-red-500">*</span> : ""} {label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className={baseClass}
        {...register(name, {
          required: required ? `${label} es obligatorio` : false,
        })}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

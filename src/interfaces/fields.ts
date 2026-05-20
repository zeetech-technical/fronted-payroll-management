import type { FieldValues, Path } from "react-hook-form";

export interface IRquestFieldSignIn {
  email: string;
  password: string;
}

export interface IFieldTextProps {
  name: string;
  placeholder: string;
  label: string;
  required?: boolean;
  readonly?: boolean;
  hidden?: boolean;
  darkMode?: boolean;
}
export interface IFieldPasswordProps extends IFieldTextProps {
  visible: boolean;
}

interface IOption {
  label: string;
  value: string;
}
export interface IFieldSelectProps extends IFieldTextProps {
  options: IOption[];
}

export type IFieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  visible?: boolean;
  options?: { label: string; value: string }[];
  component: React.ComponentType<any>;
  darkMode?: boolean;
};


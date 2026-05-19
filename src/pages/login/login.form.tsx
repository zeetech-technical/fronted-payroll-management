import { useForm, type FieldValues, type Path } from "react-hook-form";
import { FieldPassword, FieldText } from "../../components/ui/field";
import { FormBuiler } from "../../components/forms/form.builer";

type LoginForm = {
  email: string;
  password: string;
};

type FieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  visible?: boolean;
  component: React.ComponentType<any>;
};

const fields: FieldConfig<LoginForm>[] = [
  {
    name: "email",
    label: "Correo electrónico",
    placeholder: "correo@gmail.com",
    required: true,
    type: "email",
    component: FieldText,
  },
  {
    name: "password",
    label: "Contraseña",
    placeholder: "********",
    required: true,
    visible: false,
    component: FieldPassword,
  },
];

export const LoginForm = () => {
  const methods = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: LoginForm) => {
    console.log("FORM DATA:", data);
  };
  return (
    <FormBuiler
      methods={methods}
      fields={fields}
      onSubmit={onSubmit}
      submitText="Iniciar sesión"
    />
  );
};

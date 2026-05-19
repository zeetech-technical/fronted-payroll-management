import { useForm, type FieldValues, type Path } from "react-hook-form";
import { FieldPassword, FieldText } from "../../components/ui/field";
import { FormBuiler } from "../../components/forms/form.builer";
import { useAuthStore } from "../../store";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);

  const methods = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await signIn(data);
      navigate("/dashboard");
    } catch (error) {}
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

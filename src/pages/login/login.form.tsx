import { useForm } from "react-hook-form";
import { FieldPassword, FieldText } from "../../components/ui/field";
import { FormBuiler } from "../../components/forms/form.builer";
import { useAuthStore } from "../../store";
import { useNavigate } from "react-router";
import type { IFieldConfig } from "../../interfaces/fields";

type LoginForm = {
  email: string;
  password: string;
};


const fields: IFieldConfig<LoginForm>[] = [
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
  //   {
  //   name: "rol",
  //   label: "roles",
  //   placeholder: "********",
  //   required: true,
  //   visible: false,
  //   options: [
  //     { label: "Administrador", value: "admin" },
  //     { label: "Usuario", value: "user" },
  //   ],
  //   component: FieldSelect,
  // },
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

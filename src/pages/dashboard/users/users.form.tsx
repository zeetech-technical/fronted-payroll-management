import { useForm } from "react-hook-form";
import { FormBuiler } from "../../../components/forms/form.builer";
import {
  FieldPassword,
  FieldSelect,
  FieldText,
} from "../../../components/ui/field";
import type { IFieldConfig } from "../../../interfaces/fields";
import { usePositionStore, useUserStore } from "../../../store";
import { useEffect } from "react";
interface IUsersForm {
  name: string;
  p_surname: string;
  m_surname: string;
  email: string;
  password: string;
  positionId: number;
  roleId: number;
}

export const UsersForm = ({ accion }: { accion: () => void }) => {
  const { selectPositiosns, selectPositionUserAvailable } = usePositionStore(
    (state) => state,
  );
  const { roles, selectRoles, createUser } = useUserStore((state) => state);
  const options = selectPositiosns.map((option) => ({
    label: option.name,
    value: option.id,
  }));
  const optionsRoles = roles.map((option) => ({
    label: option.name,
    value: option.id,
  }));

  const fields: IFieldConfig<IUsersForm>[] = [
    {
      name: "name",
      label: "Nombre",
      placeholder: "ej: Victor ",
      required: true,
      component: FieldText,
      darkMode: false,
    },
    {
      name: "m_surname",
      label: "Apellido Materno",
      placeholder: "ej: Garcia ",
      required: true,
      component: FieldText,
      darkMode: false,
    },
    {
      name: "p_surname",
      label: "Apellido Paterno",
      placeholder: "ej: Hernandez ",
      required: true,
      component: FieldText,
      darkMode: false,
    },
    {
      name: "email",
      label: "Correo Electronico",
      placeholder: "Ingresa correo electronico",
      required: true,
      component: FieldText,
      darkMode: false,
    },
    {
      name: "password",
      label: "Contraseña",
      placeholder: "Ingresa contraseña",
      required: true,
      component: FieldPassword,
      darkMode: false,
    },
    {
      name: "roleId",
      label: "Rol",
      placeholder: "Selecciona un rol",
      required: true,
      options: optionsRoles,
      component: FieldSelect,
      darkMode: false,
    },
    {
      name: "positionId",
      label: "Puesto",
      placeholder: "Selecciona un puesto",
      required: true,
      options,
      component: FieldSelect,
      darkMode: false,
    },
  ];

  const methods = useForm<IUsersForm>({
    defaultValues: {
      name: "",
      p_surname: "",
      m_surname: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: IUsersForm) => {
    try {
      await createUser({
        ...data,
        roleId: +data.roleId,
        positionId: +data.positionId,
      });
      accion();
    } catch (error) {}
  };

  useEffect(() => {
    selectPositionUserAvailable();
    selectRoles();
  }, []);

  return (
    <FormBuiler
      methods={methods}
      fields={fields}
      onSubmit={onSubmit}
      submitText={"Registrar"}
    />
  );
};

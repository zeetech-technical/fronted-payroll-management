import { useForm } from "react-hook-form";
import { FieldText } from "../../../components/ui/field";
import type { IFieldConfig } from "../../../interfaces/fields";
import { FormBuiler } from "../../../components/forms/form.builer";
import { usePositionStore } from "../../../store";

interface TabuladorFormProps {
  accion: () => void;
}

type PositionFormType = {
  name: string;
};

const fields: IFieldConfig<PositionFormType>[] = [
  {
    name: "name",
    label: "Nombre del puesto",
    placeholder: "Ejemplo: Gerente",
    required: true,
    type: "text",
    component: FieldText,
    darkMode: false,
  },
];
export const PositionForm = ({ accion }: TabuladorFormProps) => {
    const { createPosition } = usePositionStore((state) => state);

  const methods = useForm<PositionFormType>({
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: PositionFormType) => {
    await createPosition(data);
    accion();
  };
  return (
    <FormBuiler
      methods={methods}
      fields={fields}
      onSubmit={onSubmit}
      submitText="Guardar"
    />
  );
};

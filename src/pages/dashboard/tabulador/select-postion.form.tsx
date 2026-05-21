import { useForm } from "react-hook-form";
import { FieldSelect } from "../../../components/ui/field/field-select";
import type { IFieldConfig } from "../../../interfaces/fields";
import { FormBuiler } from "../../../components/forms/form.builer";
import { usePositionStore } from "../../../store";
import { useEffect } from "react";

interface IPositionForm {
  positionId: string;
}

interface PositionFormProps {
  isEdit: boolean;
  accion: () => void;
  tabId: number;
}

export const SelectPostionForm = ({
  accion,
  isEdit,
  tabId,
}: PositionFormProps) => {
  const positions = usePositionStore((state) => state.selectPositiosns);
  const assignToTab = usePositionStore((state) => state.assignToTab);
  const selectPositionToTab = usePositionStore((state) => state.selectPositionToTab);

  const options = !positions.length ? [] : positions
    .map((position) => ({
      label: position.name,
      value: position.id,
    }));
  const fields: IFieldConfig<IPositionForm>[] = [
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

  const methods = useForm<IPositionForm>({
    defaultValues: {
      positionId: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: IPositionForm) => {
    await assignToTab({
      positionId: Number(data.positionId),
      tabuladorId: tabId,
    });
    accion();

  };

  useEffect(() => {
    selectPositionToTab();
  }, []);
  

  return (
    <FormBuiler
      methods={methods}
      fields={fields}
      onSubmit={onSubmit}
      submitText={isEdit ? "Actualizar" : "Registrar"}
    />
  );
};

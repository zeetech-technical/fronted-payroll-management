import { useEffect } from "react";
import { usePositionStore, useUserStore } from "../../../store";
import type { IFieldConfig } from "../../../interfaces/fields";
import { FieldSelect } from "../../../components/ui/field";
import { useForm } from "react-hook-form";
import { FormBuiler } from "../../../components/forms/form.builer";

interface IAddPositionForm {
  positionId: any;
}
export const AddPositionForm = ({userSelected, accion}: {userSelected: any, accion: () => void}) => {
  const { assignPosition } = useUserStore(
    (state) => state,
  );
  const { selectPositiosns, selectPositionUserAvailable } = usePositionStore(
    (state) => state,
  );

  const options = selectPositiosns.map((option) => ({
    label: option.name,
    value: option.id,
  }));

  const fields: IFieldConfig<IAddPositionForm>[] = [
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

  const methods = useForm<IAddPositionForm>({
    defaultValues: {
      positionId: 0,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: IAddPositionForm) => {
    try {
      await assignPosition({
        userId: userSelected,
        positionId: +data.positionId,
      });
      accion();
    } catch (error) {}
  };

  useEffect(() => {
    selectPositionUserAvailable();
  }, []);
  return (
    <FormBuiler
      methods={methods}
      fields={fields}
      onSubmit={onSubmit}
      submitText={"Asignar puesto"}
    />
  );
};

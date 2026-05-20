import { useForm } from "react-hook-form";
import { FieldText } from "../../../components/ui/field";
import { FieldSelect } from "../../../components/ui/field/field-select";
import type { IFieldConfig } from "../../../interfaces/fields";
import { FormBuiler } from "../../../components/forms/form.builer";
import { useCatalogStore } from "../../../store";

interface ICatalogForm {
  name: string;
  typeCatalogId: string;
}

interface CatalogFormProps {
  isEdit: boolean;
  accion: () => void;
}

export const CatalogoForm = ({ accion, isEdit }: CatalogFormProps) => {
  const typeCatalogs = useCatalogStore((state) => state.typeCatalogs);
  const addCatalog = useCatalogStore((state) => state.addCatalog);

  const options = typeCatalogs.map((type) => ({
    label: type.name,
    value: type.id,
  }));
  const fields: IFieldConfig<ICatalogForm>[] = [
    {
      name: "name",
      label: "Nombre",
      placeholder: "Nombre del catálogo",
      required: true,
      component: FieldText,
      darkMode: false,
    },
    {
      name: "typeCatalogId",
      label: "Tipo",
      placeholder: "Selecciona un tipo",
      required: true,
      options,
      component: FieldSelect,
      darkMode: false,
    },
  ];

  const methods = useForm<ICatalogForm>({
    defaultValues: {
      name: "",
      typeCatalogId: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ICatalogForm) => {
    try {
      await addCatalog(data);
      accion();
    } catch (error) {}
  };  

  return (
    <FormBuiler
      methods={methods}
      fields={fields}
      onSubmit={onSubmit}
      submitText={isEdit ? "Actualizar" : "Registrar"}
    />
  );
};

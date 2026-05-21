import { useForm } from "react-hook-form";
import { FieldCustomCatalog } from "../../../components/ui/field";
import type { IFieldConfig } from "../../../interfaces/fields";
import { useCatalogStore, useTabuladorStore } from "../../../store";
import { FormBuiler } from "../../../components/forms/form.builer";
import { ToastHelper } from "../../../helpers";

interface TabuladorFormProps {
  accion: () => void;
}

type TabuladorFormType = {
  concepts: any[];
};

const isPositive = (valor: number) => {
  const num = Number(valor);

  return !isNaN(num) && isFinite(num) && num > 0;
};

export const TabuladorForm = ({ accion }: TabuladorFormProps) => {
  const { catalogs } = useCatalogStore((state) => state);
  const newCatalogs = catalogs.filter((catalog) => !catalog.deletedAt);

  const { createTabuladorConfig } = useTabuladorStore((state) => state);

  const fields: IFieldConfig<TabuladorFormType>[] = [
    {
      name: "concepts",
      label: "",
      component: FieldCustomCatalog,
      options: newCatalogs,
    },
  ];

  const methods = useForm<TabuladorFormType>({
    defaultValues: {
      concepts: [],
    },
    mode: "onChange",
  });

  const onSubmit = async (data: TabuladorFormType) => {
    if (data.concepts.length === 0) {
      ToastHelper({
        message: "Debe seleccionar al menos un concepto",
        type: "error",
      });
      return;
    }

    const hasInvalidConcept = data.concepts.some(
      (c) => !isPositive(c.monto) && !isPositive(c.porcentaje),
    );

    if (hasInvalidConcept) {
      ToastHelper({
        message: "Monto o porcentaje deben ser mayores a 0",
        type: "error",
      });
      return;
    }

    const conceptsFormat = data.concepts.map((concept: any) => {
      delete concept.tipo;
      return concept;
    });

    await createTabuladorConfig(conceptsFormat);
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

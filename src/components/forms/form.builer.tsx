import {
  FormProvider,
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import { Buttom } from "../ui/buttom";

interface FormBuilderProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  fields: {
    name: string;
    component: React.ComponentType<any>;
    [key: string]: any;
  }[];
  onSubmit: SubmitHandler<T>;
  submitText?: string;
}

export const FormBuiler = <T extends FieldValues>({
  methods,
  fields,
  onSubmit,
  submitText = "Guardar",
}: FormBuilderProps<T>) => {
  
  const {
    formState: { isValid },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
        {fields.map((field) => {
          const Component = field.component;
          return <Component key={field.name} {...field} />;
        })}

        <Buttom title={submitText} onClick={() => {}} type="submit" disabled={!isValid} />
      </form>
    </FormProvider>
  );
};

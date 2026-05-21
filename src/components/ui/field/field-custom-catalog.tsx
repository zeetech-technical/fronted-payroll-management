import { useFieldArray, useFormContext } from "react-hook-form";

interface Catalogo {
  id: number;
  name: string;
  typeCatalog?: {
    name: string;
  };
}

interface Props {
  name: string;
  options: Catalogo[];
  darkMode?: boolean;
}

export const FieldCustomCatalog = ({
  name,
  options,
  darkMode = false,
}: Props) => {
  const { control, register, watch, setValue } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const selectedIds = watch(name)?.map((x: any) => x.catalogId);

  const groupedCatalogs = options.reduce((acc: any, item) => {
    const group = item.typeCatalog?.name || "General";

    if (!acc[group]) {
      acc[group] = [];
    }

    acc[group].push(item);

    return acc;
  }, {});

  const isSelected = (id: number) => selectedIds?.includes(id);

  const handleToggle = (catalogo: Catalogo) => {
    const index = fields.findIndex((x: any) => x.catalogId === catalogo.id);

    if (index >= 0) {
      remove(index);
      return;
    }

    append({
      catalogId: catalogo.id,
      tipo: "monto",
      monto: null,
      porcentaje: null,
    });
  };

  const handleTypeChange = (index: number, type: "monto" | "porcentaje") => {
    setValue(`${name}.${index}.tipo`, type);

    if (type === "monto") {
      setValue(`${name}.${index}.porcentaje`, null);
    } else {
      setValue(`${name}.${index}.monto`, null);
    }
  };

  return (
    <div className="space-y-8">
      {Object.entries(groupedCatalogs).map(([group, items]: any) => (
        <div key={group} className="space-y-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full ${
                group === "Percepción" ? "bg-emerald-500" : "bg-rose-500"
              }`}
            />

            <h3
              className={`
                  text-sm
                  font-semibold
                  tracking-wide
                  uppercase
                  ${darkMode ? "text-white" : "text-gray-700"}
                `}
            >
              {group}
            </h3>

            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="space-y-3">
            {items.map((catalogo: Catalogo) => {
              const index = fields.findIndex(
                (x: any) => x.catalogId === catalogo.id,
              );

              const selected = isSelected(catalogo.id);

              const tipo =
                index >= 0 ? watch(`${name}.${index}.tipo`) : "monto";

              return (
                <div
                  key={catalogo.id}
                  className={`
                        rounded-2xl
                        border
                        overflow-hidden
                        transition-all
                        duration-200
                        ${
                          selected
                            ? `
                              border-teal-300
                              bg-teal-50/70
                              shadow-sm
                            `
                            : `
                              border-gray-200
                              bg-white
                            `
                        }
                      `}
                >
                  <div
                    className="
                          flex
                          items-center
                          gap-3
                          px-4
                          py-4
                        "
                  >
                    <button
                      type="button"
                      onClick={() => handleToggle(catalogo)}
                      className={`
                            w-6
                            h-6
                            rounded-lg
                            border
                            flex
                            items-center
                            justify-center
                            transition
                            ${
                              selected
                                ? `
                                  bg-teal-600
                                  border-teal-600
                                `
                                : `
                                  border-gray-300
                                  bg-white
                                `
                            }
                          `}
                    >
                      {selected && (
                        <div
                          className="
                                w-2.5
                                h-2.5
                                rounded-sm
                                bg-white
                              "
                        />
                      )}
                    </button>

                    <span
                      className={`
                            font-medium
                            ${darkMode ? "text-white" : "text-gray-800"}
                          `}
                    >
                      {catalogo.name}
                    </span>
                  </div>

                  {selected && index >= 0 && (
                    <div
                      className="
                              border-t
                              border-teal-100
                              px-4
                              py-4
                              bg-white/70
                            "
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        <div
                          className="
                                  flex
                                  bg-gray-100
                                  rounded-xl
                                  p-1
                                  w-fit
                                "
                        >
                          <button
                            type="button"
                            onClick={() => handleTypeChange(index, "monto")}
                            className={`
                                    px-5
                                    py-2
                                    rounded-lg
                                    text-sm
                                    font-medium
                                    transition
                                    ${
                                      tipo === "monto"
                                        ? `
                                          bg-white
                                          shadow-sm
                                          text-gray-900
                                        `
                                        : `
                                          text-gray-500
                                        `
                                    }
                                  `}
                          >
                            $ Monto
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleTypeChange(index, "porcentaje")
                            }
                            className={`
                                    px-5
                                    py-2
                                    rounded-lg
                                    text-sm
                                    font-medium
                                    transition
                                    ${
                                      tipo === "porcentaje"
                                        ? `
                                          bg-white
                                          shadow-sm
                                          text-gray-900
                                        `
                                        : `
                                          text-gray-500
                                        `
                                    }
                                  `}
                          >
                            % Porcentaje
                          </button>
                        </div>

                        <div className="flex-1">
                          <div className="relative">
                            <input
                              type="number"
                              step="0.01"
                              placeholder={tipo === "monto" ? "$0" : "%0"}
                              className="
                                      w-full
                                      h-12
                                      rounded-xl
                                      border
                                      border-gray-200
                                      bg-white
                                      px-4
                                      outline-none
                                      transition
                                      focus:border-teal-500
                                      focus:ring-2
                                      focus:ring-teal-500
                                    "
                              {...register(
                                tipo === "monto"
                                  ? `${name}.${index}.monto`
                                  : `${name}.${index}.porcentaje`,
                                {
                                  valueAsNumber: true,
                                },
                              )}
                            />

                            {tipo === "porcentaje" && (
                              <span
                                className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-xs
                                        text-gray-400
                                      "
                              >
                                ej: 0.15
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <input
                        type="hidden"
                        {...register(`${name}.${index}.catalogId`)}
                      />

                      <input
                        type="hidden"
                        {...register(`${name}.${index}.tipo`)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

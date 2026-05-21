import { useMemo, useState } from "react";
import { Modal } from "../../../components/ui/modal";
import { SelectPostionForm } from "./select-postion.form";

type Props = {
  data: any[];
};

export default function TabuladorView({ data }: Props) {
  const [localData, ] = useState(data);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const configsByTab = useMemo(() => {
    const map: Record<number, any[]> = {};

    localData.forEach((tab) => {
      map[tab.id] = tab.tabuladorConfig ?? [];
    });

    return map;
  }, [localData]);

  // const handleDeleteTab = (tabId: number) => {
  //   setLocalData((prev) => prev.filter((t) => t.id !== tabId));
  // };

  //   const handleDeleteConfig = (tabId: number, configId: number) => {
  //     setLocalData((prev) =>
  //       prev.map((tab) =>
  //         tab.id === tabId
  //           ? {
  //               ...tab,
  //               tabuladorConfig: tab.tabuladorConfig.filter(
  //                 (c: any) => c.id !== configId,
  //               ),
  //             }
  //           : tab,
  //       ),
  //     );
  //   };

  const handleCloseModal = () => {
    setSelectedTab(0);
    setOpenModal(false);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {localData.map((tab) => (
          <div
            key={tab.id}
            className="border rounded-xl bg-white shadow-sm p-4 flex flex-col"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold">Tabulador #{tab.id}</h2>

              <span className="text-xs text-gray-400">
                {configsByTab[tab.id]?.length ?? 0} conceptos
              </span>
            </div>

            {tab.position && (
              <div className="flex gap-2 justify-center p-3 border-t border-b flex-wrap ">
                <p className="text-sm font-medium">P.A: {tab.position.name}</p>
              </div>
            )}

            <div className="space-y-2 flex-1">
              {configsByTab[tab.id]?.length > 0 ? (
                configsByTab[tab.id].map((cfg) => (
                  <div
                    key={cfg.id}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium">{cfg.catalog?.name}</p>

                      <p className="text-xs text-gray-500">
                        {cfg.catalog?.typeCatalog?.name}
                      </p>
                    </div>

                    <div className="text-sm font-semibold">
                      {cfg.monto != null
                        ? `$${Number(cfg.monto).toLocaleString("es-MX")}`
                        : cfg.porcentaje != null
                          ? `${cfg.porcentaje * 100}%`
                          : "-"}
                    </div>

                    {/* <button
                      onClick={() =>
                        handleDeleteConfig(tab.id, cfg.id)
                      }
                      className="text-red-500 text-xs ml-2"
                    >
                      Eliminar
                    </button> */}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">Sin conceptos</p>
              )}
            </div>

            <div className="flex gap-2 justify-center mt-4 pt-3 border-t flex-wrap">
              {/* <button
                onClick={() => handleDeleteTab(tab.id)}
                className="px-3 py-1 text-xs rounded bg-red-100 text-red-600 hover:bg-red-200"
              >
                Eliminar
              </button> */}

              {!tab.position && (
                <button
                  onClick={() => {
                    setSelectedTab(tab.id);
                    setOpenModal(true);
                  }}
                  className="px-3 py-1 text-xs rounded bg-teal-100 text-teal-600 hover:bg-teal-200"
                >
                  Asignar Puesto
                </button>
              )}

              {/* <button
                onClick={() => console.log("editar", tab.id)}
                className="px-3 py-1 text-xs rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
              >
                Editar
              </button>

              <button
                onClick={() => console.log("restaurar", tab.id)}
                className="px-3 py-1 text-xs rounded bg-green-100 text-green-600 hover:bg-green-200"
              >
                Restaurar
              </button> */}
            </div>
          </div>
        ))}
      </div>
      <Modal active={openModal} setActive={setOpenModal} title="Asignar Puesto">
        <SelectPostionForm
          accion={handleCloseModal}
          isEdit={false}
          tabId={selectedTab}
        />
      </Modal>
    </div>
  );
}

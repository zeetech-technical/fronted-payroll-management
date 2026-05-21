import { FaPencilAlt } from "react-icons/fa";
import {
  MdDeleteForever,
  MdOutlineAddCircleOutline,
  MdRestore,
} from "react-icons/md";
import { DataTable } from "../../../components/table";
import { usePositionStore } from "../../../store";
import { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import { PositionForm } from "./position.form";

export const PositionPage = () => {
  const { positions } = usePositionStore((state) => state);
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Puesto</h1>
          <p className="text-sm text-gray-500 mt-1">
            Administración de Puestos
          </p>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => setOpen(true)}
            className="bg-black text-white p-2 rounded-lg hover:opacity-90 transition flex gap-1 flex-row"
          >
            <MdOutlineAddCircleOutline size={25} />
            <span>Agregar</span>
          </button>
        </div>
      </div>
      <section>
        <DataTable
          data={positions}
          columns={[
            {
              header: "Nombre",
              render: (position) => (
                <span className="font-medium text-gray-800">
                  {position.name}
                </span>
              ),
            },

            {
              header: "Estado",
              render: (position) => (
                <span
                  className={`text-xs px-2 py-1 rounded-md ${
                    position.deletedAt
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {position.deletedAt ? "Eliminado" : "Activo"}
                </span>
              ),
            },

            {
              header: "Acciones",
              className: "flex justify-end gap-2",
              render: (position) => (
                <>
                  <button className="border p-2 rounded-lg hover:bg-gray-100">
                    <FaPencilAlt
                      size={18}
                      // onClick={() => handleEdit()}
                    />
                  </button>

                  {position.deletedAt ? (
                    <button
                      // onClick={() => handleRestoreCatalog(catalog.id)}
                      className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
                    >
                      <MdRestore size={18} />
                    </button>
                  ) : (
                    <button
                      //onClick={() => handleDeleteCatalog(catalog.id)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                    >
                      <MdDeleteForever size={18} />
                    </button>
                  )}
                </>
              ),
            },
          ]}
        />
      </section>
      <Modal active={open} setActive={setOpen} title="Agregar Puesto">
        <PositionForm accion={() => setOpen(false)} />
      </Modal>
    </div>
  );
};

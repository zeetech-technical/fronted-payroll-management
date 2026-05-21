import { CiViewList } from "react-icons/ci";
// import { FaPencilAlt } from "react-icons/fa";
import {
  MdDeleteForever,
  MdOutlineAddCircleOutline,
  MdRestore,
} from "react-icons/md";
import { DataTable } from "../../../components/table";
import { Modal } from "../../../components/ui/modal";
import { useCatalogPage } from "../../../hooks";
import { CatalogoForm } from "./catalogo.form";
import { Empty } from "../../../components/empty/empty";

export const CatalogPage = () => {
  const {
    catalogs,
    typeCatalogs,
    handleDeleteCatalog,
    handleRestoreCatalog,
    openModal,
    setOpenModal,
    openModalType,
    setOpenModalType,
    isStatusEdit,
    setIsStatusEdit,
  } = useCatalogPage();

  const handleEdit = () => {
    setIsStatusEdit(true);
    setOpenModal(true);
  };

  const handleAdd = () => {
    setIsStatusEdit(false);
    setOpenModal(true);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Catálogos</h1>
          <p className="text-sm text-gray-500 mt-1">
            Administración de conceptos
          </p>
        </div>

        <div className="flex gap-1">
          <button
            onClick={handleAdd}
            className="bg-black text-white p-2 rounded-lg hover:opacity-90 transition flex gap-1 flex-row"
          >
            <MdOutlineAddCircleOutline size={25} />
            <span>Agregar</span>
          </button>
          <button
            onClick={() => setOpenModalType(true)}
            className="bg-black text-white p-2 rounded-lg hover:opacity-90 transition flex gap-1 flex-row"
          >
            <CiViewList size={25} />
            <span>ver tipos</span>
          </button>
        </div>
      </div>

      <section>
        {catalogs.length === 0 ? (
          <Empty title="No hay catálogos disponibles" />
        ) : (
          <DataTable
            data={catalogs}
            columns={[
              {
                header: "Nombre",
              render: (catalog) => (
                <span className="font-medium text-gray-800">
                  {catalog.name}
                </span>
              ),
            },

            {
              header: "Tipo",
              render: (catalog) => <span>{catalog.typeCatalog?.name}</span>,
            },

            {
              header: "Factor",
              render: (catalog) => {
                const type = typeCatalogs.find(
                  (item) => item.id === catalog.typeCatalogId,
                );

                return (
                  <span
                    className={`text-xs px-2 py-1 rounded-md ${
                      Number(type?.factor) > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {type?.factor}
                  </span>
                );
              },
            },

            {
              header: "Estado",
              render: (catalog) => (
                <span
                  className={`text-xs px-2 py-1 rounded-md ${
                    catalog.deletedAt
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {catalog.deletedAt ? "Eliminado" : "Activo"}
                </span>
              ),
            },

            {
              header: "Acciones",
              className: "flex justify-end gap-2",
              render: (catalog) => (
                <>
                  {/* <button className="border p-2 rounded-lg hover:bg-gray-100">
                    <FaPencilAlt
                      size={18}
                      onClick={() => handleEdit()}
                    />
                  </button> */}

                  {catalog.deletedAt ? (
                    <button
                      onClick={() => handleRestoreCatalog(catalog.id)}
                      className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
                    >
                      <MdRestore size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDeleteCatalog(catalog.id)}
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
        )}
      </section>

      <Modal
        title={isStatusEdit ? "Editar" : "Agregar"}
        active={openModal}
        setActive={setOpenModal}
      >
        <CatalogoForm
          isEdit={isStatusEdit}
          accion={handleEdit}
        />
      </Modal>

      <Modal
        title="Tipos de Catalogo"
        active={openModalType}
        setActive={setOpenModalType}
      >
        <section>
          <DataTable
            data={typeCatalogs}
            columns={[
              {
                header: "Nombre",
                render: (type) => (
                  <span className="font-medium text-gray-800">{type.name}</span>
                ),
              },
              {
                header: "Factor",
                render: (type) => (
                  <span
                    className={`text-xs px-2 py-1 rounded-md ${
                      Number(type?.factor) > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {type?.factor}
                  </span>
                ),
              },
            ]}
          />
        </section>
      </Modal>
    </div>
  );
};

import { useState } from "react";
import { useCatalogStore } from "../../store";
import { SwalHelper } from "../../helpers";

export const useCatalogPage = () => {
  const { catalogs, typeCatalogs, deleteCatalog, restoreCatalog } =
    useCatalogStore((state) => state);

  const [openModal, setOpenModal] = useState(false);
  const [openModalType, setOpenModalType] = useState(false);

  const handleDeleteCatalog = (id: number) => {
    SwalHelper({
      title: "¿Estás seguro?",
      text: "Se eliminará el catálogo",
      icon: "warning",
      confirmText: "Sí, eliminar",
      cancelText: "Cancelar",
      accion: () => {
        deleteCatalog(id);
      },
    });
  };

  const handleRestoreCatalog = (id: number) => {
    SwalHelper({
      title: "¿Estás seguro?",
      text: "Se restaurará el catálogo",
      icon: "info",
      confirmText: "Sí, restaurar",
      cancelText: "Cancelar",
      accion: () => {
        restoreCatalog(id);
      },
    });
  };

  return {
    catalogs,
    typeCatalogs,
    handleDeleteCatalog,
    handleRestoreCatalog,
    openModal,
    setOpenModal,
    openModalType,
    setOpenModalType,
  };
};

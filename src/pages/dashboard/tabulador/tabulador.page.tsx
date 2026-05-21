import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import { TabuladorForm } from "./tabulador.form";
import TabuladorContainer from "./tabulador.container";
import { useTabuladorStore } from "../../../store";

export const TabuladorPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isStatusEdit, setIsStatusEdit] = useState(false);
  const { tabuladores } = useTabuladorStore((state) => state);

  const handleAdd = () => {
    setIsStatusEdit(false);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsStatusEdit(false);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Tabulador</h1>
          <p className="text-sm text-gray-500 mt-1">
            Administración de tabuladores
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
        </div>
      </div>
      <section>
        <TabuladorContainer data={tabuladores} />
      </section>

      <Modal
        title={isStatusEdit ? "Editar Tabulador" : "Agregar Tabulador"}
        active={openModal}
        setActive={setOpenModal}
      >
        <section>
          <TabuladorForm accion={handleCloseModal} />
        </section>
      </Modal>
    </div>
  );
};

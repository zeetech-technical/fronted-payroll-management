import {
  MdDeleteForever,
  MdOutlineAddCircleOutline,
  MdRestore,
} from "react-icons/md";
import { useUserPage } from "../../../hooks";
import { DataTable } from "../../../components/table";
import { FaPencilAlt } from "react-icons/fa";
import { Modal } from "../../../components/ui/modal";
import { Empty } from "../../../components/empty/empty";
import { UsersForm } from "./users.form";
import { useState } from "react";
import { AddPositionForm } from "./add.position.form";

export const UsersPage = () => {
  const {
    users,
    handleDeleteUser,
    handleRestoreUser,
    openModalForm,
    setOpenModalForm,
  } = useUserPage();

  const [userSelected, setUserSelected] = useState<any>();
  const [openModalAssignPosition, setOpenModalAssignPosition] = useState(false);

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Usuarios</h1>
          <p className="text-sm text-gray-500 mt-1">
            Administración de usuarios
          </p>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => setOpenModalForm(true)}
            className="bg-black text-white p-2 rounded-lg hover:opacity-90 transition flex gap-1 flex-row"
          >
            <MdOutlineAddCircleOutline size={25} />
            <span>Agregar</span>
          </button>
        </div>
      </div>

      <section>
        {users.length === 0 ? (
          <Empty title="No hay usuarios disponibles" />
        ) : (
          <DataTable
            data={users}
            columns={[
              {
                header: "Nombre",
                render: (user) => (
                  <span className="font-medium text-gray-800">
                    {user.fullname}
                  </span>
                ),
              },
              {
                header: "Roles",
                render: (user) => (
                  <span className="font-medium text-gray-800">
                    {user.roles.map((role: any) => role.name).join(", ")}
                  </span>
                ),
              },
              {
                header: "Puesto",
                render: (user) => (
                  <span className="font-medium text-gray-800">
                    {user.position?.name || "Sin asignar"}
                  </span>
                ),
              },
              {
                header: "Estado",
                render: (user) => (
                  <span
                    className={`text-xs px-2 py-1 rounded-md ${
                      user.deletedAt
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.deletedAt ? "Eliminado" : "Activo"}
                  </span>
                ),
              },

              {
                header: "Acciones",
                className: "flex justify-end gap-2",
                render: (user) => (
                  <>
                    {!user.position && (
                      <button
                        onClick={() => {
                          setOpenModalAssignPosition(true);
                          setUserSelected(user.id);
                        }}
                        className="border p-2 rounded-lg hover:bg-gray-100"
                      >
                        <FaPencilAlt size={18} />
                      </button>
                    )}

                    {user.deletedAt ? (
                      <button
                        onClick={() => handleRestoreUser(user.id)}
                        className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
                      >
                        <MdRestore size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeleteUser(user.id)}
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
        title="Formulario de Usuario"
        active={openModalForm}
        setActive={() => setOpenModalForm(false)}
      >
        <UsersForm accion={() => setOpenModalForm(false)} />
      </Modal>

      <Modal
        title="Asignar Puesto"
        active={openModalAssignPosition}
        setActive={() => setOpenModalAssignPosition(false)}
      >
        <AddPositionForm
          userSelected={userSelected}
          accion={() => setOpenModalAssignPosition(false)}
        />
      </Modal>
    </div>
  );
};

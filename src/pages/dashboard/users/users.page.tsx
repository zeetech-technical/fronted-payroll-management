import {
  MdDeleteForever,
  MdOutlineAddCircleOutline,
  MdRestore,
} from "react-icons/md";
import { useUserPage } from "../../../hooks";
import { DataTable } from "../../../components/table";
import { FaPencilAlt } from "react-icons/fa";
import { Modal } from "../../../components/ui/modal";

export const UsersPage = () => {
  const {
    users,
    handleDeleteUser,
    handleRestoreUser,
    openModalForm,
    setOpenModalForm,
  } = useUserPage();
  return (
    <div className="p-6 space-y-8">
      <Modal
        title="Formulario de Usuario"
        active={openModalForm}
        setActive={setOpenModalForm}
      >
        <div>
          <h1>Formulario de Usuario</h1>
        </div>
      </Modal>

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
                  <button className="border p-2 rounded-lg hover:bg-gray-100">
                    <FaPencilAlt size={18} />
                  </button>

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
      </section>
      {/* 
 
       <Modal
         title="Añadir Type Catalog"
         active={openModal}
         setActive={setOpenModal}
       >
         <div>
           <form className="space-y-4">
             <div>
               <label className="text-sm text-gray-600">Nombre</label>
 
               <input
                 type="text"
                 placeholder="Ej. Percepción"
                 className="w-full mt-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
               />
             </div>
 
             <div>
               <label className="text-sm text-gray-600">Factor</label>
 
               <select className="w-full mt-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black">
                 <option value="1">1</option>
                 <option value="-1">-1</option>
               </select>
             </div>
 
             <div className="flex justify-end gap-3 pt-2">
               <button
                 type="button"
                 onClick={() => setOpenModal(false)}
                 className="border px-4 py-2 rounded-lg hover:bg-gray-100"
               >
                 Cancelar
               </button>
 
               <button
                 type="submit"
                 className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
               >
                 Guardar
               </button>
             </div>
           </form>
         </div>
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
       </Modal> */}
    </div>
  );
};

import { useState } from "react";
import { useUserStore } from "../../store";

export const useUserPage = () => {
  const { users } = useUserStore((state) => state);
  const [openModalForm, setOpenModalForm] = useState(false);

  const handleDeleteUser = (id: number) => {
    console.log(id);
  };
  const handleRestoreUser = (id: number) => {
    console.log(id);
  };

  return {
    users,
    openModalForm,
    setOpenModalForm,
    handleDeleteUser,
    handleRestoreUser,
  };
};

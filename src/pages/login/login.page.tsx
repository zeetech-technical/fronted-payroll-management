// import { LoginForm } from "../../components/forms";
// import { ToastHelper } from "../helpers";

import { LoginForm } from "./login.form";

export const LoginPage = () => {
  // const notify = () => ToastHelper({ message: "Wow so easy !", type: "error" });

  return (
    <>
      {/* <div>LoginPage</div>
      <button
        onClick={notify}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Notify !
      </button> */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h1>
        <LoginForm />
      </div>
    </>
  );
};

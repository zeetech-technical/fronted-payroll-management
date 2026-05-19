// import { LoginForm } from "../../components/forms";
// import { ToastHelper } from "../helpers";

import { LoginForm } from "./login.form";

export const LoginPage = () => {
  // const notify = () => ToastHelper({ message: "Wow so easy !", type: "error" });

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* <div>LoginPage</div>
      <button
        onClick={notify}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Notify !
      </button> */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Iniciar Sesión
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

import { ToastHelper } from "../helpers";

export const LoginPage = () => {
  const notify = () => ToastHelper({ message: "Wow so easy !", type: "error" });

  return (
    <>
      <div>LoginPage</div>
      <button onClick={notify}>Notify !</button>
    </>
  );
};

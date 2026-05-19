import { PrivateHeader } from "./private-header";
import { PrivateFooter } from "./private-footer";
import { PrivateAside } from "./private-aside";
import { Outlet } from "react-router";

export const PrivateLayout = () => {
  return (
    <div className="min-h-screen flex flex-col gap-6 p-6">
      <PrivateHeader />
      <main className="flex flex-1 gap-4 flex-col sm:flex-row">
        <PrivateAside />
        <section className="flex-1 bg-white rounded-lg shadow-2xl p-6">
          <Outlet />
        </section>
      </main>
      <PrivateFooter />
    </div>
  );
};

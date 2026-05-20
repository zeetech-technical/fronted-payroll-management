import type { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  title: string;
  active: boolean;
  setActive: (active: boolean) => void;
}
export const Modal = ({ children, title, active, setActive }: ModalProps) => {
  return active ? (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            onClick={() => setActive(!active)}
            className="text-gray-400 hover:text-black"
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  ) : null;
};

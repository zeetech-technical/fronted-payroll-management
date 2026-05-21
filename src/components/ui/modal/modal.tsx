import type { ReactNode } from "react";
import { MdClose } from "react-icons/md";

interface ModalProps {
  children: ReactNode;
  title: string;
  active: boolean;
  setActive: (active: boolean) => void;
}
export const Modal = ({ children, title, active, setActive }: ModalProps) => {
  return active ? (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-2xl p-6 shadow-xl max-h-[500px] overflow-y-auto overscroll-contain">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            onClick={() => setActive(!active)}
            className="text-red-400 hover:bg-red-50 hover:scale-110 transition"
          >
            <MdClose size={24} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  ) : null;
};

interface IButtomProps {
  title: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  //   className?: string;
  disabled: boolean;
}

export const Buttom = ({ title, onClick, type, disabled }: IButtomProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
    w-full
    px-6
    py-3
    rounded-2xl
    font-semibold
    text-white

    bg-blue-600

    transition-all
    duration-200
    ease-in-out

    hover:bg-blue-700
    hover:shadow-lg
    hover:-translate-y-px

    active:bg-blue-800
    active:scale-[0.98]

    focus:outline-none
    focus:ring-4
    focus:ring-blue-300

    disabled:bg-gray-400
    disabled:cursor-not-allowed
    disabled:hover:translate-y-0
    disabled:hover:shadow-none
    disabled:active:scale-100
  "
    >
      {title}
    </button>
  );
};

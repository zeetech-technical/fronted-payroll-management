export const PrivateFooter = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-4 w-full flex items-center justify-center">
      <p className="text-white/70 text-sm">
        © {new Date().getFullYear()} Todos los derechos reservados
      </p>
    </footer>
  );
};

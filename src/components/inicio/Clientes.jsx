
"use client";

import { toast } from "sonner";

export const Clientes = () => {
  const handleShowMessage = () => {
    toast.info("Temporalmente fuera de servicio");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-linear-to-b from-[#1450ff]/15 to-white/5 p-6 sm:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Si eres cliente inicia sesión aquí
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/65">
            Portal de clientes Titán para seguimiento de pedidos, historial de
            compras y más.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleShowMessage}
            className="rounded-xl bg-[#1450ff] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0b3aa4]"
          >
            Iniciar sesión
          </button>
          <button
            onClick={scrollToTop}
            className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/85 hover:bg-white/10"
          >
            Volver arriba
          </button>
        </div>
      </div>
    </div>
  );
};
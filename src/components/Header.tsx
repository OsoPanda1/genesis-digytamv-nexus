import React from "react";
import Navigation from "@/modules/constelacionInteractiva/Navigation";

/**
 * Header de TAMV Online Network
 *
 * - Renderiza la Constelación Interactiva como sistema de navegación principal.
 * - Está diseñado para convivir con el campo TAMVTRIX 3.0 que vive en el Layout,
 *   sin tapar ni “aplastar” la capa de letras T A M V O N L I N E.
 * - Usa fondo translúcido y blur para que el campo cuántico permanezca visible
 *   detrás de la navegación.
 */
const Header: React.FC = () => {
  return (
    <header
      className="
        relative z-20
        w-full
        flex items-center justify-center
        px-4 pt-4 pb-2
        pointer-events-none
      "
    >
      {/* Contenedor de la Constelación: permite interacción pero mantiene la sensación de HUD flotante */}
      <div
        className="
          max-w-6xl w-full
          pointer-events-auto
        "
      >
        <div
          className="
            tamv-header-shell
            rounded-3xl
            border border-white/10
            bg-slate-950/60
            backdrop-blur-2xl
            shadow-[0_18px_60px_rgba(15,23,42,0.95),0_0_55px_rgba(56,189,248,0.28)]
            relative overflow-hidden
          "
        >
          {/* Capa de luz suave que se mezcla con TAMVTRIX */}
          <div
            className="
              pointer-events-none
              absolute inset-0
              bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.22),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(192,132,252,0.2),transparent_60%)]
              mix-blend-soft-light
              opacity-80
            "
          />

          {/* Ruido sutil para textura física */}
          <div
            className="
              pointer-events-none
              absolute inset-0
              opacity-40
              mix-blend-soft-light
              bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='3' stitchTiles='noStitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.32'/%3E%3C/svg%3E\")]
            "
          />

          {/* Borde interno iridiscente */}
          <div
            className="
              pointer-events-none
              absolute inset-[1px] rounded-[1.4rem]
              border border-transparent
              bg-[conic-gradient(from_140deg,rgba(59,245,255,0.4),rgba(192,132,252,0.35),rgba(59,245,255,0.4))]
              opacity-45
              mix-blend-soft-light
            "
          />

          {/* Contenido real del header: Constelación Interactiva */}
          <div className="relative z-10 px-3 py-2 md:px-5 md:py-3">
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

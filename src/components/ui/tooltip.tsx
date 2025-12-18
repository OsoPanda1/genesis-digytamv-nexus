import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    // habilita arrow de Radix
    side="top"
    align="center"
    className={cn(
      // contenedor base
      "z-50 relative overflow-hidden rounded-xl border text-[11px] leading-relaxed",
      // fondo cristal cuántico
      "bg-slate-950/85 border-cyan-300/25 backdrop-blur-xl",
      // sombra volumétrica
      "shadow-[0_0_26px_rgba(15,23,42,0.95),0_0_40px_rgba(56,189,248,0.35)]",
      // padding interno
      "px-3.5 py-2",
      // texto
      "text-slate-50/95",
      // halo interno iridiscente
      "before:pointer-events-none before:absolute before:inset-[1px] before:rounded-[0.75rem] before:border before:border-transparent before:bg-[conic-gradient(from_140deg,rgba(59,245,255,0.28),rgba(192,132,252,0.33),rgba(59,245,255,0.24))] before:opacity-40 before:mix-blend-soft-light",
      // noise sutil
      "after:pointer-events-none after:absolute after:inset-0 after:bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='3' stitchTiles='noStitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.22'/%3E%3C/svg%3E\")] after:mix-blend-soft-light after:opacity-60",
      // animaciones entrada/salida
      "animate-in fade-in-0 zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      // límite de ancho y salto de línea inteligente
      "max-w-xs whitespace-pre-line",
      className
    )}
    {...props}
  >
    {/* capa interna para “pixeles de luz” TAMVTRIX */}
    <div className="relative z-10">
      {props.children}
      <span className="pointer-events-none absolute -inset-x-1 -bottom-1 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent opacity-75" />
    </div>

    {/* arrow coherente con el borde */}
    <TooltipPrimitive.Arrow
      className="fill-slate-950/90"
      width={14}
      height={8}
    />
  </TooltipPrimitive.Content>
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

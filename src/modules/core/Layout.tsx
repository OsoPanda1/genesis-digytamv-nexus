
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import MatrixEffect from "@/components/MatrixEffect";

type LayoutProps = {
  children: React.ReactNode;
  showMatrixEffect?: boolean;
};

/**
 * Layout principal que encapsula la estructura base de TAMV Online Network
 * Componente raíz que implementa los elementos visuales compartidos en toda la plataforma
 */
const Layout: React.FC<LayoutProps> = ({ children, showMatrixEffect = true }) => {
  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 relative overflow-hidden perspective-1000">
        {/* Efecto Matrix Digital (Representación visual del flujo de datos) */}
        {showMatrixEffect && (
          <MatrixEffect 
            color="rgba(0, 190, 255, 0.6)" 
            fontSize={16} 
            speed={60} 
            density={0.985} 
            text={["TAMV", "ONLINE", "GÉNESIS", "DIGYTAMV", "NETWORK"]} 
            className="opacity-30 mix-blend-screen"
          />
        )}
        
        {/* Nexo Estelar: Interfaz Principal - Panel Central */}
        <Header />
        
        {/* Contenido Principal */}
        <main className="flex-1 relative z-10">
          {children}
        </main>
        
        <Toaster />
        <Sonner />
      </div>
    </TooltipProvider>
  );
};

export default Layout;

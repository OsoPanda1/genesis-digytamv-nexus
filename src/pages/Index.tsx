import React from "react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import PrismaticCard from "@/components/PrismaticCard";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Dynamic Background Effect */}
      <div className="fixed inset-0 bg-black z-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-quantum-600/50 via-background to-background/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Neural Grid Overlay */}
        <motion.div 
          className="absolute inset-0 bg-[url('/photo-1518770660439-4636190af475')] bg-cover bg-center opacity-10 mix-blend-overlay"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Futuristic Circuit Pattern */}
        <motion.div 
          className="absolute inset-0 bg-[url('/photo-1526374965328-7f61d4dc18c5')] bg-cover opacity-5"
          animate={{ 
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <Header />
      
      <motion.main 
        className="flex-1 container max-w-4xl mx-auto px-4 py-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-8">
          {/* Hero section with enhanced visuals */}
          <section className="text-center space-y-4 relative">
            {/* Holographic Effect */}
            <div className="absolute -top-20 -left-20 w-[140%] h-[140%] bg-gradient-prismatic opacity-5 blur-3xl animate-pulse-slow" />
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight relative">
              <span className="text-gradient bg-gradient-crystal animate-text-shimmer">GÉNESIS</span>{" "}
              <span className="text-white/90">DIGYTAMV</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Arquitectura Visionaria para la Documentación y Desarrollo del Futuro
            </p>
            
            <Separator className="bg-gradient-prismatic h-0.5 opacity-50 max-w-xs mx-auto" />
          </section>

          {/* Main content with enhanced cards */}
          <section className="relative">
            {/* Neural Network Background Effect */}
            <div className="absolute inset-0 bg-[url('/photo-1485827404703-89b55fcc595e')] bg-cover opacity-5 mix-blend-overlay" />
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <PrismaticCard className="h-full flex flex-col backdrop-blur-lg border-white/10">
                  <div className="absolute inset-0 bg-gradient-quantum opacity-5 animate-pulse-slow" />
                  <h2 className="text-xl font-semibold mb-4 relative z-10">Integración Neural de Datos</h2>
                  <p className="text-sm text-muted-foreground mb-6 relative z-10">
                    La plataforma Génesis Digytamv permite la asimilación de documentos en 
                    su estructura n-dimensional mediante un proceso de cristalización dinámica.
                  </p>
                  
                  <FileUpload className="flex-1 relative z-10" />
                </PrismaticCard>
              </div>
              
              <div className="space-y-6">
                <PrismaticCard variant="crystal" className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/photo-1439337153520-7082a56a81f4')] bg-cover opacity-10" />
                  <h3 className="font-medium mb-2 relative z-10">Prisma Cognitivo</h3>
                  <p className="text-sm text-muted-foreground relative z-10">
                    Explora la arquitectura multidimensional donde el conocimiento 
                    trasciende las estructuras lineales convencionales.
                  </p>
                </PrismaticCard>
                
                <PrismaticCard variant="quantum" className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/photo-1496307653780-42ee777d4833')] bg-cover opacity-10" />
                  <h3 className="font-medium mb-2 relative z-10">Nodos Simbióticos</h3>
                  <p className="text-sm text-muted-foreground relative z-10">
                    Los elementos documentales existen en un estado de refinamiento constante, 
                    mejorando automáticamente su precisión y relevancia.
                  </p>
                </PrismaticCard>
                
                <PrismaticCard variant="nebula" className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/photo-1551038247-3d9af20df552')] bg-cover opacity-10" />
                  <h3 className="font-medium mb-2 relative z-10">Seguridad Exoplanar</h3>
                  <p className="text-sm text-muted-foreground relative z-10">
                    Sistema inmune digital que detecta y neutraliza inconsistencias lógicas
                    mediante cifrado homomórfico completo.
                  </p>
                </PrismaticCard>
              </div>
            </div>
          </section>
          
          {/* Footer section with futuristic timestamp */}
          <section className="text-center">
            <p className="text-xs text-muted-foreground">
              TAMV ONLINE NETWORK © 2025 — Metaconsciencia Sistémica v1.0
            </p>
          </section>
        </div>
      </motion.main>
    </div>
  );
};

export default Index;

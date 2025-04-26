
import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import PrismaticCard from "@/components/PrismaticCard";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate parallax transformations
  const getParallaxStyle = (depth: number) => {
    const x = (mousePosition.x - (containerRef.current?.offsetWidth || 0) / 2) / depth;
    const y = (mousePosition.y - (containerRef.current?.offsetHeight || 0) / 2) / depth;
    return {
      transform: `translate(${x}px, ${y}px)`,
    };
  };

  return (
    <div 
      ref={containerRef} 
      className="flex flex-col min-h-screen bg-background relative overflow-hidden perspective-1000"
    >
      {/* Dynamic Background Effect with parallax */}
      <div className="fixed inset-0 bg-black z-0">
        {/* Cosmic Tree Layer */}
        <div 
          className="absolute inset-0 bg-[url('/lovable-uploads/46b80c50-4191-4268-9b90-920da55ae5e6.png')] bg-cover bg-center opacity-30 mix-blend-screen"
          style={{
            transform: `translateZ(-200px) scale(${1 + scrollPosition * 0.0005})`,
            transition: "transform 0.1s ease-out",
          }}
        />
        
        {/* Mystical Tree Layer */}
        <div 
          className="absolute inset-0 bg-[url('/lovable-uploads/7f7da0f7-8fa6-4df7-a139-2668062c0b01.png')] bg-cover bg-center opacity-20 mix-blend-overlay"
          style={{
            ...getParallaxStyle(20),
            transform: `translateZ(-150px) translateX(${-scrollPosition * 0.02}px)`,
          }}
        />
        
        {/* Cosmic Circle Layer */}
        <div 
          className="absolute inset-0 bg-[url('/lovable-uploads/e56b7d2b-3b9b-4f2d-bc6c-245f063b39ec.png')] bg-cover opacity-15 mix-blend-luminosity"
          style={{
            ...getParallaxStyle(15),
            transform: `translateZ(-100px) translateX(${scrollPosition * 0.03}px)`,
          }}
        />

        {/* Digital Earth Layer */}
        <div 
          className="absolute inset-0 bg-[url('/lovable-uploads/81cc94d5-e823-4cb3-8227-f751a0c02485.png')] bg-cover bg-center opacity-10 mix-blend-overlay"
          style={{
            ...getParallaxStyle(25),
            transform: `translateZ(-120px) scale(${1 + scrollPosition * 0.0005})`,
          }}
        />

        {/* Animated particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="stars-container">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="absolute rounded-full bg-white" 
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        </div>
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

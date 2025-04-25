
import React from "react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import PrismaticCard from "@/components/PrismaticCard";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Hero section */}
          <section className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-gradient">GÉNESIS</span> DIGYTAMV
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Arquitectura Visionaria para la Documentación y Desarrollo del Futuro
            </p>
            <Separator className="bg-gradient-prismatic h-0.5 opacity-50 max-w-xs mx-auto" />
          </section>

          {/* Main content */}
          <section>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <PrismaticCard className="h-full flex flex-col">
                  <h2 className="text-xl font-semibold mb-4">Integración Neural de Datos</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    La plataforma Génesis Digytamv permite la asimilación de documentos en 
                    su estructura n-dimensional mediante un proceso de cristalización dinámica.
                  </p>
                  
                  <FileUpload className="flex-1" />
                </PrismaticCard>
              </div>
              
              <div>
                <PrismaticCard variant="crystal" className="mb-6">
                  <h3 className="font-medium mb-2">Prisma Cognitivo</h3>
                  <p className="text-sm text-muted-foreground">
                    Explora la arquitectura multidimensional donde el conocimiento 
                    trasciende las estructuras lineales convencionales.
                  </p>
                </PrismaticCard>
                
                <PrismaticCard variant="quantum" className="mb-6">
                  <h3 className="font-medium mb-2">Nodos Simbióticos</h3>
                  <p className="text-sm text-muted-foreground">
                    Los elementos documentales existen en un estado de refinamiento constante, 
                    mejorando automáticamente su precisión y relevancia.
                  </p>
                </PrismaticCard>
                
                <PrismaticCard variant="nebula">
                  <h3 className="font-medium mb-2">Seguridad Exoplanar</h3>
                  <p className="text-sm text-muted-foreground">
                    Sistema inmune digital que detecta y neutraliza inconsistencias lógicas
                    mediante cifrado homomórfico completo.
                  </p>
                </PrismaticCard>
              </div>
            </div>
          </section>
          
          {/* Footer section */}
          <section className="text-center">
            <p className="text-xs text-muted-foreground">
              TAMV ONLINE NETWORK © {new Date().getFullYear()} — Metaconsciencia Sistémica v1.0
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;

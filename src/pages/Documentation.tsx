
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight } from "lucide-react";

type DocSection = {
  title: string;
  id: string;
  content: React.ReactNode;
  subsections?: DocSection[];
};

const Documentation = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "intro": true
  });

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const documentationSections: DocSection[] = [
    {
      title: "Introducción y Visión General",
      id: "intro",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-crystal-400">Visión General de TAMV Online Network</h3>
          <p>
            TAMV Online Network emerge como una plataforma digital pionera, concebida para la provisión
            de experiencias inmersivas multisensoriales a escala global. Su arquitectura se fundamenta
            en la convergencia de tecnologías de vanguardia, con el objetivo de redefinir los paradigmas
            de interacción digital.
          </p>
          <h3 className="text-xl font-semibold text-crystal-400">Génesis Digytamv: Arquitectura Visionaria</h3>
          <p>
            Génesis Digytamv constituye la arquitectura de sistema subyacente que cohesiona la totalidad
            de las funcionalidades de TAMV Online Network. Este diseño integral garantiza una escalabilidad
            horizontal eficiente, un rendimiento caracterizado por baja latencia y una disponibilidad
            de servicio continua.
          </p>
          <h3 className="text-xl font-semibold text-crystal-400">Integración con el Ecosistema de Google</h3>
          <p>
            La arquitectura y el desarrollo de TAMV Online Network se han concebido con una integración
            profunda y estratégica con el ecosistema de Google Cloud y Gemini para proporcionar una
            plataforma robusta, segura y escalable.
          </p>
        </div>
      ),
    },
    {
      title: "Experiencia del Usuario y Funcionalidades Clave",
      id: "ux",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-crystal-400">Primeros Pasos</h3>
          <p>
            La entrada a TAMV Online Network ha sido diseñada para ser intuitiva y segura, aprovechando
            la robusta infraestructura de autenticación de Google Cloud con integración OAuth 2.0.
          </p>
          <h3 className="text-xl font-semibold text-crystal-400">Entornos Inmersivos y Comunicación</h3>
          <p>
            TAMV Online Network redefine la interacción digital mediante entornos inmersivos como Dream Spaces,
            Puentes Oníricos, Chats 3D con avatares personalizables, y eventos en vivo que aprovechan las 
            capacidades multisensoriales de la plataforma.
          </p>
          <h3 className="text-xl font-semibold text-crystal-400">Creación e Interacción de Contenido</h3>
          <p>
            La plataforma permite crear publicaciones mixtas que combinan múltiples elementos sensoriales,
            videos Onlive (similar a TikTok), streaming en tiempo real, y webcams Pay Per View para contenido
            exclusivo monetizado.
          </p>
        </div>
      ),
    },
    {
      title: "AURA AI Potenciada por Gemini Cloud",
      id: "aura-ai",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-crystal-400">Arquitectura de AURA AI</h3>
          <p>
            La arquitectura de AURA AI se fundamenta en un modelo híbrido de aprendizaje, combinando algoritmos
            supervisados y no supervisados, procesamiento de lenguaje natural de vanguardia, visión artificial
            y modelos generativos avanzados proporcionados por Gemini Cloud a través de Vertex AI.
          </p>
          <h3 className="text-xl font-semibold text-crystal-400">Funcionalidades Clave de AURA AI</h3>
          <p>
            AURA AI analiza el perfil único de cada usuario para ofrecer recomendaciones contextuales avanzadas,
            generación de experiencias sensoriales personalizadas, asistencia inteligente en la creación de contenido,
            moderación inteligente y análisis de tendencias.
          </p>
          <h3 className="text-xl font-semibold text-crystal-400">API de AURA AI</h3>
          <p>
            TAMV Online Network expone una API robusta para que los desarrolladores puedan interactuar con las 
            capacidades de AURA AI impulsadas por Gemini Cloud, solicitando recomendaciones personalizadas y 
            generando contenido inteligente.
          </p>
          <h3 className="text-xl font-semibold text-crystal-400">Seguridad, Privacidad y Ética</h3>
          <p>
            La inteligencia y personalización de AURA AI se construyen sobre una base sólida de principios éticos
            y medidas de protección, incluyendo privacidad por diseño, consentimiento explícito y transparencia
            algorítmica.
          </p>
        </div>
      ),
    },
    {
      title: "Anubis Sentinel System y Seguridad",
      id: "security",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-crystal-400">Arquitectura de Anubis Sentinel System</h3>
          <p>
            Anubis Sentinel System adopta una estrategia de defensa en profundidad, distribuyendo capas de seguridad
            a través de toda la arquitectura de TAMV Online Network, aprovechando al máximo los servicios de
            seguridad ofrecidos por Google Cloud Platform.
          </p>
          <h3 className="text-xl font-semibold text-crystal-400">Aprovechando la Seguridad de Google Cloud</h3>
          <p>
            La integración nativa con Google Cloud Platform permite a Anubis Sentinel System beneficiarse de una
            infraestructura segura por diseño, con servicios como IAM, VPC Service Controls, Cloud KMS y 
            Security Command Center.
          </p>
          <h3 className="text-xl font-semibold text-crystal-400">Funcionalidades de Seguridad</h3>
          <p>
            Anubis Sentinel System proporciona monitorización en tiempo real, detección y prevención de intrusiones,
            análisis de registros, gestión de políticas de seguridad, respuesta automatizada a incidentes y
            auditorías periódicas.
          </p>
          <h3 className="text-xl font-semibold text-crystal-400">Cumplimiento Normativo</h3>
          <p>
            TAMV Online Network cumple con estándares como GDPR, ISO/IEC 27001, SOC 2 Tipo II, HIPAA y PCI DSS,
            y mantiene un programa activo de Bug Bounty para seguridad colaborativa.
          </p>
        </div>
      ),
    },
    {
      title: "Economía Digital y Monetización",
      id: "economy",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-crystal-400">Créditos TAMV</h3>
          <p>
            Los Créditos TAMV constituyen la columna vertebral económica de la plataforma, diseñados para facilitar
            la adquisición de activos digitales, acceso a contenido premium, apoyo a creadores y participación en
            la Galería de Arte TAMV.
          </p>
          <h3 className="text-xl font-semibold text-crystal-400">Tienda Virtual</h3>
          <p>
            La tienda virtual ofrece avatares personalizables, elementos para Dream Spaces, efectos sensoriales
            digitales, acceso a espacios premium y entradas para eventos, con un programa integral para creadores
            y un sistema de comisiones transparente.
          </p>
          <h3 className="text-xl font-semibold text-crystal-400">Membresías por Niveles</h3>
          <p>
            TAMV Online Network ofrece un sistema de membresías por niveles optimizado para diferentes perfiles 
            de usuario, desde el nivel gratuito básico hasta opciones premium con beneficios exclusivos.
          </p>
        </div>
      ),
    },
    {
      title: "Registro del Proyecto",
      id: "registration",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-crystal-400">Información de Registro</h3>
          <p>
            Registro del Proyecto con ORCID iD: 0009-0008-5050-1539
          </p>
          <p>
            <a 
              href="https://orcid.org/0009-0008-5050-1539" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-crystal-400 hover:text-crystal-300 underline"
            >
              Enlace al registro ORCID
            </a>
          </p>
        </div>
      ),
    },
  ];

  const DocSectionComponent = ({ section }: { section: DocSection }) => {
    const isExpanded = expandedSections[section.id] || false;
    
    return (
      <div className="mb-6">
        <button 
          onClick={() => toggleSection(section.id)}
          className="flex items-center w-full text-left py-2 hover:bg-black/30 rounded px-3 transition-colors"
        >
          {isExpanded ? 
            <ChevronDown className="h-5 w-5 mr-2 text-quantum-300" /> : 
            <ChevronRight className="h-5 w-5 mr-2 text-quantum-300" />
          }
          <h2 className="text-2xl font-bold text-quantum-300">{section.title}</h2>
        </button>
        
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-6 mt-4 p-4 rounded-md bg-black/20 border border-white/5"
          >
            {section.content}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Dynamic Background Effect with parallax */}
      <div className="fixed inset-0 bg-black z-0">
        {/* Cosmic Tree Layer */}
        <div className="absolute inset-0 bg-[url('/lovable-uploads/46b80c50-4191-4268-9b90-920da55ae5e6.png')] bg-cover bg-center opacity-30 mix-blend-screen" />
        
        {/* Mystical Tree Layer */}
        <div className="absolute inset-0 bg-[url('/lovable-uploads/7f7da0f7-8fa6-4df7-a139-2668062c0b01.png')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        
        {/* Digital Earth Layer */}
        <div className="absolute inset-0 bg-[url('/lovable-uploads/81cc94d5-e823-4cb3-8227-f751a0c02485.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      </div>
      
      <Header />
      
      <motion.main 
        className="flex-1 container max-w-4xl mx-auto px-4 py-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-6">
          {/* Hero section for Documentation */}
          <section className="text-center space-y-4 relative mb-8">
            <div className="absolute -top-20 -left-20 w-[140%] h-[140%] bg-gradient-prismatic opacity-5 blur-3xl animate-pulse-slow" />
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight relative">
              <span className="text-gradient bg-gradient-crystal animate-text-shimmer">Documentación</span>
            </h1>
            
            <div className="relative flex items-center justify-center py-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[2px] w-2/3 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-70"></div>
              </div>
              <div className="relative bg-black/50 px-4 py-1 rounded-full border border-white/10">
                <p className="text-sm font-semibold text-white flex items-center">
                  <span className="text-red-500">O</span>
                  <span className="text-white mx-1">•</span>
                  <span className="text-green-500">M</span>
                  <span className="text-white mx-1">•</span>
                  <span className="text-red-500">H</span>
                  <span className="mx-2 text-xs opacity-70">|</span>
                  <span className="text-xs text-white/70">Orgullosamente Mexicanos, Real del Monte, Hidalgo</span>
                </p>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Arquitectura Visionaria para la Documentación y Desarrollo del Futuro
            </p>
            
            <Separator className="bg-gradient-prismatic h-0.5 opacity-50 max-w-xs mx-auto" />
          </section>

          {/* Documentation Content */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-6">
            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
              <div className="space-y-2">
                {documentationSections.map((section) => (
                  <DocSectionComponent key={section.id} section={section} />
                ))}
              </div>
            </ScrollArea>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-xs text-muted-foreground">
              TAMV ONLINE NETWORK © 2025 — Metaconsciencia Sistémica v1.0
            </p>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default Documentation;

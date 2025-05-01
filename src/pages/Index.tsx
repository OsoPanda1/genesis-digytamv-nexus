
import React from "react";
import Layout from "@/modules/core/Layout";
import NexoEstelarPanel from "@/modules/nexoEstelar/NexoEstelarPanel";
import BackgroundEffects from "@/modules/interfazSensorial/BackgroundEffects";

/**
 * Página principal de TAMV Online Network
 * 
 * Utiliza los componentes modulares del blueprint para crear una experiencia
 * coherente con la visión del proyecto.
 */
const Index = () => {
  return (
    <Layout>
      {/* Efectos visuales de fondo */}
      <BackgroundEffects />
      
      {/* Panel principal con la interfaz Nexo Estelar */}
      <NexoEstelarPanel />
    </Layout>
  );
};

export default Index;

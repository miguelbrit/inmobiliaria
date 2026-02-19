import Hero from '../components/Hero';
import FeaturedProperties from '../components/FeaturedProperties';
import CTA from '../components/CTA'; // Mantenemos el CTA antiguo o lo reemplazamos si el usuario prefirió el nuevo. 
// Usaré el nuevo FinalCTA del archivo de secciones para ser fiel a la estructura solicitada.

import {
  PropertyTypes,
  WhyChooseUs,
  MarketStats,
  ProcessSection,
  FeaturedAgents,
  Testimonials,
  ExploreLocations,
  FinalCTA
} from '../components/sections/HomeSections';

import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* 1. Hero (Mantener actual) */}
      <Hero />

      {/* 2. Propiedades Destacadas (Mantener actual) */}
      <FeaturedProperties />

      {/* 3. Tipos de Propiedad */}
      <PropertyTypes />

      {/* 4. ¿Por Qué Elegirnos? */}
      <WhyChooseUs />

      {/* 5. Estadísticas de Mercado */}
      <MarketStats />

      {/* 6. Proceso de Compra/Venta */}
      <ProcessSection />

      {/* 7. Agentes Destacados */}
      <FeaturedAgents />

      {/* 8. Testimonios */}
      <Testimonials />

      {/* 9. Explorar por Ubicación */}
      <ExploreLocations />

      {/* 10. CTA Final */}
      <FinalCTA />
      
    </div>
  );
};

export default HomePage;

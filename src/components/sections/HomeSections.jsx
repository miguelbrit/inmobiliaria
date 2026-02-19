import React from 'react';

// Iconos SVG minimalistas
const Icons = {
  location: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  verified: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  home: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  key: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>,
  search: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  user: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  chart: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
  quote: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" /></svg>
};

// ==========================================
// 3. TIPOS DE PROPIEDAD
// ==========================================
export const PropertyTypes = () => (
  <section className="section-spacing bg-pattern">
    <div className="container">
      <div className="section-header text-center fade-up">
        <h2 className="heading-lg">Explora por Tipo de Propiedad</h2>
        <p className="subtitle">Explora por tipo de propiedad y encuentra exactamente lo que buscas.</p>
      </div>
      
      <div className="grid-responsive-5">
        {[
          { label: 'Apartamentos', count: 124, icon: Icons.home },
          { label: 'Casas', count: 86, icon: Icons.home },
          { label: 'Oficinas', count: 32, icon: Icons.home },
          { label: 'Locales', count: 18, icon: Icons.home },
          { label: 'Terrenos', count: 21, icon: Icons.location }, // Icono ajustado
        ].map((type, idx) => (
          <div key={idx} className="type-card fade-up" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="type-icon">{type.icon}</div>
            <h3 className="type-title">{type.label}</h3>
            <span className="type-count">{type.count} Propiedades</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ==========================================
// 4. ¿POR QUÉ ELEGIRNOS?
// ==========================================
export const WhyChooseUs = () => (
  <section className="section-spacing">
    <div className="container">
      <div className="section-header text-center fade-up">
        <h2 className="heading-lg">¿Por Qué Elegirnos?</h2>
        <p className="subtitle">Compromiso, transparencia y resultados excepcionales.</p>
      </div>
      
      {/* Ajustado a grid de 4 para los 4 pilares estratégicos */}
      <div className="grid-responsive-4">
        {[
          { title: 'Evaluación Profesional', desc: 'Tasaciones precisas basadas en datos reales de mercado.', icon: Icons.verified },
          { title: 'Asesoría Integral', desc: 'Acompañamiento completo desde la búsqueda hasta la firma.', icon: Icons.user },
          { title: 'Publicación Premium', desc: 'Exposición estratégica en canales de alta visibilidad.', icon: Icons.search },
          { title: 'Red de Inversores', desc: 'Acceso a oportunidades exclusivas antes del mercado abierto.', icon: Icons.chart },
        ].map((item, idx) => (
          <div key={idx} className="feature-card fade-up" style={{ animationDelay: `${idx * 150}ms` }}>
            <div className="feature-icon-wrapper">{item.icon}</div>
            <h3 className="feature-title">{item.title}</h3>
            <p className="feature-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ==========================================
// 5. ESTADÍSTICAS DE MERCADO
// ==========================================
export const MarketStats = () => (
  <section className="section-spacing bg-dark text-white stats-section">
    <div className="container">
      <div className="section-header text-center fade-up">
          <p className="subtitle text-white">Resultados medibles que respaldan nuestra experiencia.</p>
      </div>
      <div className="stats-grid-wrapper">
        {[
          { label: 'Propiedades Vendidas', value: '+1,240' },
          { label: 'Satisfacción del Cliente', value: '98%' },
          { label: 'Años en el Mercado', value: '+12' },
          { label: 'Clientes Atendidos', value: '+3,500' },
        ].map((stat, idx) => (
          <div key={idx} className="stat-card fade-up">
            <h2 className="stat-number text-white">{stat.value}</h2>
            <p className="stat-label text-white">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ==========================================
// 6. PROCESO DE COMPRA/VENTA
// ==========================================
export const ProcessSection = () => (
  <section className="section-spacing">
    <div className="container">
      <div className="section-header text-center fade-up">
        <h2 className="heading-lg">Tu Camino al Nuevo Hogar</h2>
        <p className="subtitle">Un proceso claro, transparente y eficiente.</p>
      </div>
      
      {/* Ajustado a grid de 4 pasos */}
      <div className="grid-responsive-4 process-grid">
        {[
          { step: '01', title: 'Consulta Inicial', desc: 'Definimos tus objetivos y necesidades específicas.', icon: Icons.search },
          { step: '02', title: 'Selección', desc: 'Te presentamos las mejores opciones del mercado.', icon: Icons.home },
          { step: '03', title: 'Negociación', desc: 'Gestionamos la documentación y aseguramos el mejor trato.', icon: Icons.verified },
          { step: '04', title: 'Cierre y Entrega', desc: 'Formalizamos la compra y te entregamos tus llaves.', icon: Icons.key },
        ].map((item, idx) => (
          <div key={idx} className="process-card fade-up">
            <div className="process-header">
              <span className="step-number">{item.step}</span>
            </div>
            <h3 className="process-title">{item.title}</h3>
            <p className="process-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ==========================================
// 7. AGENTES DESTACADOS
// ==========================================
export const FeaturedAgents = () => (
  <section className="section-spacing bg-light">
    <div className="container">
      <div className="section-header text-center fade-up">
        <h2 className="heading-lg">Conoce a Nuestros Expertos</h2>
        <p className="subtitle">Profesionales dedicados a encontrar tu mejor opción.</p>
      </div>
      
      {/* Ajustado a grid de 3 agentes */}
      <div className="grid-responsive-3">
        {[
          { name: 'Laura Méndez', role: 'Especialista Residencial', image: '/imagenes/laura_mendez.jpg' },
          { name: 'Carlos Duarte', role: 'Inversiones y Comerciales', image: '/imagenes/carlos_duarte.jpg' },
          { name: 'Andrea Ríos', role: 'Luxury Real Estate Advisor', image: '/imagenes/andrea_rios.jpg' },
        ].map((agent, idx) => (
          <div key={idx} className="agent-card fade-up" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="agent-image-wrapper">
              <img src={agent.image} alt={agent.name} className="agent-photo" />
            </div>
            <div className="agent-info">
              <h3 className="agent-name">{agent.name}</h3>
              <p className="agent-role">{agent.role}</p>
              <button className="btn-link">Ver Perfil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ==========================================
// 8. TESTIMONIOS
// ==========================================
export const Testimonials = () => (
  <section className="section-spacing">
    <div className="container">
      <div className="section-header text-center fade-up">
        <h2 className="heading-lg">Experiencias Reales</h2>
      </div>
      
      <div className="grid-responsive-2 testimonial-grid-layout">
        <div className="testimonial-card fade-up">
            <div className="quote-icon">{Icons.quote}</div>
            <p className="testimonial-text">“Encontramos nuestra casa ideal en menos de un mes. Profesionalismo absoluto.”</p>
            <div className="testimonial-footer">
              <div className="author-avatar-sm"></div>
              <div>
                <h4 className="author-name">Mariana Torres</h4>
                <span className="author-role">Propietaria</span>
              </div>
            </div>
        </div>

        <div className="testimonial-card fade-up" style={{ animationDelay: '100ms' }}>
            <div className="quote-icon">{Icons.quote}</div>
            <p className="testimonial-text">“Transparencia total durante todo el proceso. Me sentí acompañado en cada etapa.”</p>
            <div className="testimonial-footer">
              <div className="author-avatar-sm"></div>
              <div>
                <h4 className="author-name">Andrés Gómez</h4>
                <span className="author-role">Inversionista</span>
              </div>
            </div>
        </div>
      </div>
    </div>
  </section>
);

// ==========================================
// 9. EXPLORAR POR UBICACIÓN
// ==========================================
export const ExploreLocations = () => (
  <section className="section-spacing">
    <div className="container">
      <div className="section-header text-center fade-up">
        <h2 className="heading-lg">Ubicaciones Más Buscadas</h2>
        <p className="subtitle">Zonas de alta valorización y calidad de vida.</p>
      </div>
      
      <div className="grid-collage fade-up">
        <div className="location-card large" style={{backgroundImage: 'url(/imagenes/casa_piscina.jpg)'}}>
          <div className="location-overlay">
            <h3>Chacao</h3>
            <span>76 Propiedades</span>
          </div>
        </div>
        <div className="location-card" style={{backgroundImage: 'url(/imagenes/casa2.jpg)'}}>
          <div className="location-overlay">
            <h3>Baruta</h3>
            <span>48 Propiedades</span>
          </div>
        </div>
        <div className="location-card" style={{backgroundImage: 'url(/imagenes/casa3.jpg)'}}>
          <div className="location-overlay">
            <h3>El Hatillo</h3>
            <span>33 Propiedades</span>
          </div>
        </div>
        <div className="location-card wide" style={{backgroundImage: 'url(/imagenes/casa2.jpg)'}}>
          <div className="location-overlay">
            <h3>Sucre / Leoncio Martínez</h3>
            <span>112 Propiedades</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ==========================================
// 10. CTA FINAL
// ==========================================
export const FinalCTA = () => (
  <section className="section-spacing cta-section bg-primary text-white">
    <div className="container">
      <div className="cta-content text-center fade-up">
        <h2 className="heading-xl">¿Listo para encontrar tu próxima propiedad?</h2>
        <p className="cta-description">Contáctanos hoy mismo y recibe asesoría personalizada.</p>
        <div className="cta-actions">
          <button className="btn btn-white btn-lg">Comenzar Búsqueda</button>
        </div>
      </div>
    </div>
  </section>
);

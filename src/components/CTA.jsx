import './CTA.css';

const CTA = () => {
  return (
    <section className="cta-section" id="vender">
      <div className="container">
        <div className="cta-content">
          <div className="cta-text">
            <h2>¿Quieres vender tu propiedad?</h2>
            <p>Publica con nosotros y llega a miles de compradores potenciales. Gestión rápida y segura.</p>
          </div>
          <div className="cta-actions">
            <button className="btn btn-white cta-btn">Publicar Ahora</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

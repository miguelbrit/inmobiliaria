import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PropertyDetail.css';

const PropertyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/properties/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setProperty(data);
                } else {
                    alert('No se pudo encontrar la propiedad');
                    navigate('/propiedades');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProperty();
        window.scrollTo(0, 0);
    }, [id, navigate]);

    if (isLoading) return <div className="loading-detail">Cargando detalles de la propiedad...</div>;
    if (!property) return null;

    return (
        <div className="property-detail-page">
            <div className="detail-gallery container">
                <div className="main-image">
                    <img src={property.images[0] || '/imagenes/placeholder.jpg'} alt={property.title} />
                </div>
                <div className="side-images">
                    <img src={property.images[1] || property.images[0]} alt="Gallery 1" />
                    <img src={property.images[2] || property.images[0]} alt="Gallery 2" />
                </div>
            </div>

            <div className="container detail-content-layout">
                <div className="detail-main">
                    <div className="detail-header">
                        <span className="detail-tag">{property.status}</span>
                        {property.featured && <span className="detail-tag featured-tag">⭐ Destacada</span>}
                        <h1 className="detail-title">{property.title}</h1>
                        <p className="detail-location">📍 {property.location}, {property.municipio}, {property.estado}</p>
                    </div>

                    <div className="detail-section">
                        <h3>Sobre esta propiedad</h3>
                        <p className="description-text">{property.description}</p>
                    </div>

                    <div className="detail-section">
                        <h3>Especificaciones</h3>
                        <div className="features-grid">
                            <div className="feature-item">
                                <span className="feature-icon">🛏️</span>
                                <span className="feature-label">{property.beds} Habitaciones</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🚿</span>
                                <span className="feature-label">{property.baths} Baños</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">📏</span>
                                <span className="feature-label">{property.area} m² Construcción</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🛡️</span>
                                <span className="feature-label">{property.seguridad ? 'Seguridad Privada' : 'Zona Residencial'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Ubicación</h3>
                        <div className="location-info-box">
                            <p><strong>Estado:</strong> {property.estado}</p>
                            <p><strong>Municipio:</strong> {property.municipio}</p>
                            <p><strong>Referencia:</strong> {property.location}</p>
                        </div>
                    </div>
                </div>

                <aside className="detail-sidebar">
                    <div className="contact-card">
                        <div className="price-container">
                            <p className="price-label">Precio de Venta</p>
                            <h2 className="price-tag">${property.price?.toLocaleString()} USD</h2>
                        </div>
                        
                        <div className="agent-box">
                            <div className="agent-avatar">
                                {property.owner?.name?.charAt(0) || 'A'}
                            </div>
                            <div className="agent-meta">
                                <p className="agent-name">{property.owner?.name || 'Asesor Inmobiliario'}</p>
                                <p className="agent-role">InmoBrito Venezuela</p>
                            </div>
                        </div>
                        
                        <div className="contact-actions">
                            <a 
                                href={`https://wa.me/584120000000?text=Hola,%20me%20interesa%20la%20propiedad:%20${property.title}`} 
                                className="btn btn-primary full-width wa-btn"
                                target="_blank"
                                rel="noreferrer"
                            >
                                📱 Contactar por WhatsApp
                            </a>
                            <button className="btn btn-outline full-width">Enviar Mensaje</button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default PropertyDetail;

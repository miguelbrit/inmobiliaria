import { Link } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  // Manejar ID de MongoDB o ID hardcoded
  const propertyId = property._id || property.id;
  
  return (
    <div className="property-card">
      <div className="property-image-container">
        <img 
          src={property.images && property.images.length > 0 ? property.images[0] : (property.image || '/imagenes/placeholder.jpg')} 
          alt={property.title} 
          className="property-image" 
        />
        <div className="card-labels">
          <span className={`property-tag ${property.status === 'Alquiler' ? 'tag-rent' : 'tag-sale'}`}>
            {property.status || 'Venta'}
          </span>
          {property.featured && <span className="property-tag tag-featured">⭐ Destacada</span>}
        </div>
      </div>
      <div className="property-details">
        <div className="property-header-row">
            <h3 className="property-price">
              {typeof property.price === 'number' 
                ? `$${property.price.toLocaleString()}` 
                : property.price}
            </h3>
            <span className="property-type-text">{property.type}</span>
        </div>
        <h4 className="property-title">{property.title}</h4>
        <p className="property-location">📍 {property.municipio || property.location}</p>
        
        <div className="property-features">
          <div className="feature">
            <span className="feature-icon">🛏️</span>
            <span>{property.beds} Hab</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🚿</span>
            <span>{property.baths} Baños</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📏</span>
            <span>{property.area} m²</span>
          </div>
        </div>
        
        <Link to={`/propiedad/${propertyId}`} className="btn btn-outline full-width card-btn">Ver Detalle Oficial</Link>
      </div>
    </div>
  );
};

export default PropertyCard;

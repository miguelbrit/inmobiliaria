import { useState, useEffect, useRef } from 'react';
import PropertyCard from './PropertyCard';
import './FeaturedProperties.css';

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardWidth, setCardWidth] = useState(364);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFeatured = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/properties');
      const data = await response.json();
      if (response.ok) {
        // Primero intentamos con destacadas
        let featured = data.filter(p => p.featured);
        
        // Si no hay destacadas, mostramos las más recientes (las 6 primeras)
        if (featured.length === 0) {
          featured = data.slice(0, 6);
        }
        
        setProperties(featured);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatured();
    
    const handleResize = () => {
      setCardWidth(window.innerWidth <= 768 ? 324 : 364);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayProperties = properties.length > 0 ? properties.slice(0, 6) : [];
  const extendedProperties = [...displayProperties, ...displayProperties, ...displayProperties];

  useEffect(() => {
    if (displayProperties.length > 0) setCurrentIndex(displayProperties.length);
  }, [displayProperties.length]);

  const handleNext = () => {
    if (isAnimating || displayProperties.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (isAnimating || displayProperties.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev - 1);
  };

  useEffect(() => {
    const total = displayProperties.length;
    if (total === 0) return;

    if (currentIndex >= total * 2 || currentIndex < total) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(currentIndex >= total * 2 ? total : total * 2 - 1);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, displayProperties.length]);

  if (isLoading) return <p className="text-center">Cargando destacados...</p>;
  if (properties.length === 0) return null;

  return (
    <section className="featured-section section bg-light">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Propiedades Destacadas</h2>
            <p className="section-subtitle">Selección exclusiva directamente desde nuestra base de datos</p>
          </div>
          <div className="slider-controls">
            <button className="control-btn prev" onClick={handlePrev}>&#10094;</button>
            <button className="control-btn next" onClick={handleNext}>&#10095;</button>
          </div>
        </div>

        <div className="slider-viewport">
          <div className="slider-track" style={{
            transform: `translateX(-${currentIndex * cardWidth}px)`,
            transition: isAnimating ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            display: 'flex', gap: '24px'
          }}>
            {extendedProperties.map((property, index) => (
              <div key={`${property._id}-${index}`} className="slider-item">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

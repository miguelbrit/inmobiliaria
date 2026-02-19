import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Opciones Dinámicas
  const [dynamicOptions, setDynamicOptions] = useState({
    estados: ['Distrito Capital'], // Fallback inicial
    municipiosPorEstado: {
        'Distrito Capital': ['Libertador', 'Chacao', 'Sucre', 'Baruta', 'El Hatillo']
    },
    tipos: ['Apartamento', 'Casa', 'Oficina', 'Local']
  });

  const [searchFilters, setSearchFilters] = useState({
    estado: '',
    municipio: '',
    type: '',
    priceMax: ''
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties/options');
        const data = await response.json();
        if (response.ok && data.estados.length > 0) {
          setDynamicOptions(data);
        }
      } catch (error) {
        console.error('Error al cargar opciones:', error);
      }
    };
    fetchOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({ 
      ...prev, 
      [name]: value,
      ...(name === 'estado' ? { municipio: '' } : {})
    }));
  };

  const handleSearch = () => {
    navigate('/propiedades', { state: { initialFilters: searchFilters } });
  };

  const slides = [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(current => (current === slides.length - 1 ? 0 : current + 1));
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <section className="hero" id="inicio">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
          ></div>
        ))}
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-content">
        <h1 className="hero-title">Encuentra tu hogar ideal</h1>
        <p className="hero-subtitle">Buscador conectado en tiempo real con nuestra base de datos</p>
        
        <div className="search-box">
          <div className="search-field">
            <label>Estado</label>
            <select name="estado" value={searchFilters.estado} onChange={handleInputChange}>
              <option value="">Selecciona Estado</option>
              {dynamicOptions.estados.map(est => (
                <option key={est} value={est}>{est}</option>
              ))}
            </select>
          </div>
          
          <div className="search-field">
            <label>Municipio</label>
            <select 
              name="municipio" 
              value={searchFilters.municipio} 
              onChange={handleInputChange}
              disabled={!searchFilters.estado}
            >
              <option value="">{searchFilters.estado ? 'Todos los Municipios' : 'Selecciona Estado'}</option>
              {searchFilters.estado && dynamicOptions.municipiosPorEstado[searchFilters.estado]?.map(mun => (
                <option key={mun} value={mun}>{mun}</option>
              ))}
            </select>
          </div>

          <div className="search-field">
            <label>Tipo</label>
            <select name="type" value={searchFilters.type} onChange={handleInputChange}>
              <option value="">Cualquier Tipo</option>
              {dynamicOptions.tipos.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="search-field">
            <label>Precio Máximo (USD)</label>
            <input 
              type="number" 
              name="priceMax" 
              value={searchFilters.priceMax} 
              onChange={handleInputChange} 
              placeholder="Monto máx."
            />
          </div>

          <button className="btn btn-primary search-btn" onClick={handleSearch}>Buscar Ahora</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

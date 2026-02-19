import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import Filters from '../components/Filters';
import './PropertiesPage.css';

const PropertiesPage = () => {
    const location = useLocation();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Filtros unificados con la Home
    const [filters, setFilters] = useState({
        estado: '',
        municipio: '',
        type: '',
        status: '', // Venta o Alquiler
        priceMin: '',
        priceMax: '',
        beds: '',
        seguridad: false
    });

    // Cargar filtros iniciales si vienen de la Home (Hero)
    useEffect(() => {
        if (location.state?.initialFilters) {
            setFilters(prev => ({
                ...prev,
                ...location.state.initialFilters
            }));
        }
        window.scrollTo(0, 0);
    }, [location.state]);

    const fetchProperties = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/properties');
            const data = await response.json();
            if (response.ok) {
                setProperties(data);
            }
        } catch (error) {
            console.error('Error al cargar propiedades:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // Lógica de filtrado unificada
    const filteredProperties = properties.filter(prop => {
        if (filters.estado && prop.estado !== filters.estado) return false;
        if (filters.municipio && prop.municipio !== filters.municipio) return false;
        if (filters.type && prop.type !== filters.type) return false;
        if (filters.status && prop.status !== filters.status) return false;
        if (filters.priceMin && prop.price < Number(filters.priceMin)) return false;
        if (filters.priceMax && prop.price > Number(filters.priceMax)) return false;
        if (filters.beds && prop.beds < Number(filters.beds)) return false;
        if (filters.seguridad && !prop.seguridad) return false;
        return true;
    });

    return (
        <div className="properties-page">
            <div className="container page-header">
                <h1 className="page-title">Encuentra tu Inmueble</h1>
                <p className="page-subtitle">Explora nuestra base de datos actualizada en tiempo real</p>
            </div>
            
            <div className="container properties-layout">
                <div className="sidebar-col">
                    <Filters 
                        filters={filters} 
                        onFilterChange={handleFilterChange} 
                    />
                </div>
                
                <div className="content-col">
                    <div className="results-info">
                        <span>Mostrando <strong>{filteredProperties.length}</strong> propiedades</span>
                        {Object.values(filters).some(v => v !== '' && v !== false) && (
                            <button className="reset-small-btn" onClick={() => setFilters({estado:'',municipio:'',type:'',status:'',priceMin:'',priceMax:'',beds:'',seguridad:false})}>
                                Limpiar Filtros ×
                            </button>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="loading-state">
                            <p>Sincronizando con MongoDB...</p>
                        </div>
                    ) : filteredProperties.length > 0 ? (
                        <div className="properties-grid-list">
                            {filteredProperties.map(prop => (
                                <PropertyCard key={prop._id} property={prop} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <h3>No se encontraron resultados</h3>
                            <p>Intenta ajustar la ubicación o el rango de precio.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertiesPage;

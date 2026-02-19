import { useState, useEffect } from 'react';
import './Filters.css';

const Filters = ({ filters, onFilterChange }) => {
    const [dynamicOptions, setDynamicOptions] = useState({
        estados: [],
        municipiosPorEstado: {},
        tipos: []
    });

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/properties/options');
                const data = await response.json();
                if (response.ok) {
                    setDynamicOptions(data);
                }
            } catch (error) {
                console.error('Error al cargar opciones:', error);
            }
        };
        fetchOptions();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const finalValue = type === 'checkbox' ? checked : value;
        
        onFilterChange(name, finalValue);

        if (name === 'estado') {
            onFilterChange('municipio', '');
        }
    };

    const handlePillClick = (e, key, value) => {
        e.preventDefault();
        onFilterChange(key, value);
    };

    return (
        <aside className="filters-sidebar">
            <div className="filters-header">
                <h3>Filtrar Búsqueda</h3>
                <button 
                    className="reset-btn"
                    onClick={() => {
                        onFilterChange('estado', '');
                        onFilterChange('municipio', '');
                        onFilterChange('type', '');
                        onFilterChange('status', '');
                        onFilterChange('priceMin', '');
                        onFilterChange('priceMax', '');
                        onFilterChange('beds', '');
                        onFilterChange('seguridad', false);
                    }}
                >
                    Limpiar
                </button>
            </div>

            {/* TIPO DE ANUNCIO: Venta / Alquiler */}
            <div className="filter-group">
                <label>Tipo de Operación</label>
                <select 
                    name="status" 
                    value={filters.status} 
                    onChange={handleInputChange} 
                    className="filter-select"
                >
                    <option value="">Todas</option>
                    <option value="Venta">🛒 En Venta</option>
                    <option value="Alquiler">🔑 En Alquiler</option>
                </select>
            </div>

            <div className="filter-group">
                <label>Estado</label>
                <select 
                    name="estado" 
                    value={filters.estado} 
                    onChange={handleInputChange} 
                    className="filter-select"
                >
                    <option value="">Cualquier Estado</option>
                    {dynamicOptions.estados.map(est => (
                        <option key={est} value={est}>{est}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Municipio</label>
                <select 
                    name="municipio" 
                    value={filters.municipio} 
                    onChange={handleInputChange} 
                    className="filter-select"
                    disabled={!filters.estado}
                >
                    <option value="">{filters.estado ? 'Todos los Municipios' : 'Selecciona Estado'}</option>
                    {filters.estado && dynamicOptions.municipiosPorEstado[filters.estado]?.map(mun => (
                        <option key={mun} value={mun}>{mun}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Tipo de Inmueble</label>
                <select 
                    name="type" 
                    value={filters.type} 
                    onChange={handleInputChange} 
                    className="filter-select"
                >
                    <option value="">Cualquiera</option>
                    {dynamicOptions.tipos.map(t => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Precio Máximo (USD)</label>
                <input 
                    type="number" 
                    name="priceMax"
                    value={filters.priceMax}
                    onChange={handleInputChange}
                    placeholder="Ej: 80000" 
                    className="filter-input" 
                />
            </div>

            <div className="filter-group">
                <label>Habitaciones Mínimas</label>
                <div className="pill-group">
                    <button 
                        className={`filter-pill ${filters.beds === '' ? 'active' : ''}`}
                        onClick={(e) => handlePillClick(e, 'beds', '')}
                    >Cualquiera</button>
                    {[1, 2, 3, 4].map(n => (
                        <button 
                            key={n}
                            className={`filter-pill ${Number(filters.beds) === n ? 'active' : ''}`}
                            onClick={(e) => handlePillClick(e, 'beds', n.toString())}
                        >{n}+</button>
                    ))}
                </div>
            </div>

            <div className="filter-group">
                <label className="checkbox-filter-label">
                    <input 
                        type="checkbox" 
                        name="seguridad" 
                        checked={filters.seguridad} 
                        onChange={handleInputChange} 
                    />
                    <span>🛡️ Seguridad Privada</span>
                </label>
            </div>

            <button 
                className="btn btn-primary full-width apply-btn"
                onClick={() => {}} 
            >
                Actualizar Resultados
            </button>
        </aside>
    );
};

export default Filters;

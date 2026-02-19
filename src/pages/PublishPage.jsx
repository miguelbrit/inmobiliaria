import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './PublishPage.css';

const PublishPage = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('properties');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myProperties, setMyProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [selectedImages, setSelectedImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Opciones de ubicación
  const municipiosMap = {
    'Distrito Capital': ['Libertador', 'Chacao', 'Sucre', 'Baruta', 'El Hatillo']
  };

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/properties');
      const data = await response.json();
      if (response.ok) {
        const userProps = data.filter(p => p.owner === userData?.id || !p.owner);
        setMyProperties(userProps);
      }
    } catch (error) {
      console.error('Error al cargar propiedades:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const session = localStorage.getItem("token");
    if (!session) {
      navigate("/");
      return;
    }
    fetchProperties();
  }, [navigate, userData]);
  
  const [formData, setFormData] = useState({
    title: '',
    status: 'Venta', // Venta o Alquiler
    type: 'Apartamento',
    price: '',
    location: '', 
    estado: 'Distrito Capital',
    municipio: 'Libertador',
    description: '',
    beds: '3',
    baths: '2',
    area: '90',
    seguridad: false,
    featured: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    addFiles(files);
  };

  const addFiles = (files) => {
    const validFiles = files.filter(file => file.type.startsWith('image/')).slice(0, 5 - selectedImages.length);
    setSelectedImages(prev => [...prev, ...validFiles]);

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ 
      title: '', status: 'Venta', type: 'Apartamento', price: '', location: '', 
      estado: 'Distrito Capital', municipio: 'Libertador',
      description: '', beds: '3', baths: '2', area: '90',
      seguridad: false, featured: false 
    });
    setSelectedImages([]);
    setPreviews([]);
  };

  const handleEdit = (prop) => {
    setEditingId(prop._id);
    setFormData({
        title: prop.title,
        status: prop.status || 'Venta',
        type: prop.type,
        price: prop.price.toString(),
        location: prop.location,
        estado: prop.estado || 'Distrito Capital',
        municipio: prop.municipio || 'Libertador',
        description: prop.description,
        beds: prop.beds?.toString() || '3',
        baths: prop.baths?.toString() || '2',
        area: prop.area?.toString() || '90',
        seguridad: prop.seguridad || false,
        featured: prop.featured || false
    });
    setPreviews(prop.images || []);
    setActiveTab('publish');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta propiedad?')) return;
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            setMyProperties(prev => prev.filter(p => p._id !== id));
        }
    } catch (error) {
        alert('Error al eliminar');
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
        const token = localStorage.getItem('token');
        const formDataToSend = new FormData();
        
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });
        
        selectedImages.forEach(image => {
            formDataToSend.append('images', image);
        });

        const url = editingId 
            ? `http://localhost:5000/api/properties/${editingId}`
            : 'http://localhost:5000/api/properties';
        
        const response = await fetch(url, {
            method: editingId ? 'PUT' : 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formDataToSend
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message);

        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setActiveTab('properties');
            fetchProperties();
            resetForm();
        }, 2000);

    } catch (error) {
        alert(error.message);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo" onClick={() => navigate("/")} style={{cursor: 'pointer'}}>
          <span>Inmo</span>Brito
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-item-btn ${activeTab === 'properties' ? 'active' : ''}`} onClick={() => setActiveTab('properties')}>
            <span className="icon">🏠</span> Mis Propiedades
          </button>
          <button className={`nav-item-btn ${activeTab === 'publish' ? 'active' : ''}`} onClick={() => { resetForm(); setActiveTab('publish'); }}>
            <span className="icon">➕</span> Publicar Nueva
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item-btn logout" onClick={() => { localStorage.clear(); window.location.href = '/'; }}>
            <span className="icon">🚪</span> Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        {showSuccess && (
          <div className="success-notify fade-up">
            ✅ ¡Propiedad {editingId ? 'actualizada' : 'publicada'} con éxito!
          </div>
        )}
        
        <div className="dashboard-container">
          {activeTab === 'properties' ? (
            <div className="dashboard-view-fade">
              <div className="view-header">
                <h2>Mis Publicaciones</h2>
                <button className="btn btn-primary" onClick={() => { resetForm(); setActiveTab('publish'); }}>+ Crear Anuncio</button>
              </div>
              {isLoading ? <p>Cargando...</p> : (
                <div className="properties-grid-dashboard">
                  {myProperties.map(prop => (
                    <div key={prop._id} className="prop-dashboard-card">
                      <div className="prop-card-header">
                        <img src={prop.images[0] || '/imagenes/placeholder.jpg'} alt={prop.title} />
                        {prop.featured && <span className="status-pill featured-badge">Destacada</span>}
                      </div>
                      <div className="prop-card-body">
                        <span className={`badge-${prop.status?.toLowerCase()}`}>{prop.status}</span>
                        <h3>{prop.title}</h3>
                        <p className="price">${prop.price?.toLocaleString()}</p>
                        <p className="loc-small">📍 {prop.municipio}, {prop.estado}</p>
                      </div>
                      <div className="prop-card-footer">
                        <button className="action-btn" onClick={() => handleEdit(prop)}>✏️</button>
                        <button className="action-btn" onClick={() => navigate(`/propiedad/${prop._id}`)}>👁️</button>
                        <button className="action-btn delete" onClick={() => handleDelete(prop._id)}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="dashboard-view-fade">
              <div className="view-header">
                <h2>{editingId ? 'Editar Propiedad' : 'Nueva Propiedad'}</h2>
                <button className="btn btn-outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
                  {isPreviewMode ? 'Editar Formulario' : 'Vista Previa'}
                </button>
              </div>

              {!isPreviewMode ? (
                <form className="publish-form-dashboard" onSubmit={handlePublish}>
                  <div className="form-group">
                    <label>Título del Inmueble</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Ej: Amplio Apartamento en Chacao" required />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                        <label>Tipo de Anuncio</label>
                        <select name="status" value={formData.status} onChange={handleInputChange}>
                            <option value="Venta">🛒 En Venta</option>
                            <option value="Alquiler">🔑 En Alquiler</option>
                        </select>
                    </div>
                    <div className="form-group">
                      <label>Tipo de Inmueble</label>
                      <select name="type" value={formData.type} onChange={handleInputChange}>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Casa">Casa</option>
                        <option value="Oficina">Oficina</option>
                        <option value="Local">Local</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Estado</label>
                      <select name="estado" value={formData.estado} onChange={handleInputChange}>
                        <option value="Distrito Capital">Distrito Capital</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Municipio</label>
                      <select name="municipio" value={formData.municipio} onChange={handleInputChange}>
                        {municipiosMap[formData.estado].map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Dirección Específica</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Urb. La Castellana, Calle El Bosque..." required />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Precio (USD {formData.status === 'Alquiler' ? '/ mes' : ''})</label>
                      <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Monto en dólares" required />
                    </div>
                    <div className="form-group">
                      <label>M² Construcción</label>
                      <input type="number" name="area" value={formData.area} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Habitaciones</label>
                      <input type="number" name="beds" value={formData.beds} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label>Baños</label>
                      <input type="number" name="baths" value={formData.baths} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group checkbox-group-featured">
                    <label className="checkbox-label">
                      <input type="checkbox" name="seguridad" checked={formData.seguridad} onChange={handleInputChange} />
                      <span>Vigilancia / Seguridad Privada 🛡️</span>
                    </label>
                  </div>

                  <div className="form-group checkbox-group-featured" style={{background: '#fff7ed', borderColor: '#fed7aa'}}>
                    <label className="checkbox-label">
                      <input type="checkbox" name="featured" checked={formData.featured} onChange={handleInputChange} />
                      <span>Destacar propiedad en la Home ⭐</span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label>Descripción detallada</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows="5" required></textarea>
                  </div>

                  <div className="upload-section-dash">
                    <p>Fotos (Máx. 5)</p>
                    <div className="dash-upload-box" onClick={() => fileInputRef.current.click()}>
                      <span>📸</span>
                      <p>Haga clic para subir imágenes</p>
                      <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple hidden accept="image/*" />
                    </div>
                    <div className="preview-thumbnails">
                      {previews.map((p, i) => (
                        <div key={i} className="thumb-item">
                          <img src={p} alt="prev" />
                          <button type="button" className="remove-thumb" onClick={() => removeImage(i)}>×</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-submit-actions">
                    <button type="button" className="btn btn-outline" onClick={() => { resetForm(); setActiveTab('properties'); }}>Cancelar</button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Guardando...' : (editingId ? 'Actualizar' : 'Publicar')}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="preview-container-box">
                  <h3>{formData.status}: {formData.title || 'Inmueble'}</h3>
                  <p className="p-price">${Number(formData.price).toLocaleString()} USD {formData.status === 'Alquiler' ? '/ mes' : ''}</p>
                  <p>📍 {formData.municipio}, {formData.estado}</p>
                  <p>📏 {formData.area} m² | 🛏️ {formData.beds} Hab | 🚿 {formData.baths} Baños</p>
                  <hr />
                  <p>{formData.description}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PublishPage;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './MasterDashboard.css';

const MasterDashboard = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(true);
  
  // Data State
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [searchUser, setSearchUser] = useState('');

  useEffect(() => {
    // Seguridad: Redirigir si no es master
    if (!userData || userData.role !== 'master') {
      // navigate('/'); // Comentado para desarrollo si el usuario no tiene rol aun
    }
    fetchData();
  }, [userData]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [statsRes, usersRes, propsRes] = await Promise.all([
        fetch('http://localhost:5000/api/master/stats', { headers }),
        fetch('http://localhost:5000/api/master/users', { headers }),
        fetch('http://localhost:5000/api/master/properties', { headers })
      ]);

      setStats(await statsRes.json());
      setUsers(await usersRes.json());
      setProperties(await propsRes.json());
    } catch (error) {
      console.error('Error fetching master data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/master/users/${userId}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setUsers(users.map(u => u._id === userId ? { ...u, status: newStatus } : u));
      }
    } catch (error) {
      alert('Error al actualizar usuario');
    }
  };

  if (loading) return <div className="master-loading">Cargando Panel Maestro...</div>;

  return (
    <div className="master-layout">
      {/* Sidebar Maestro */}
      <aside className="master-sidebar">
        <div className="master-logo">
          <span>Master</span>Panel
        </div>
        <div className="admin-profile">
          <div className="admin-avatar">M</div>
          <div>
            <p className="admin-name">{userData?.name}</p>
            <p className="admin-badge">Super Admin</p>
          </div>
        </div>
        <nav className="master-nav">
          <button className={activeTab === 'stats' ? 'active' : ''} onClick={() => setActiveTab('stats')}>📊 Estadísticas</button>
          <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>👥 Gestionar Asesores</button>
          <button className={activeTab === 'props' ? 'active' : ''} onClick={() => setActiveTab('props')}>🏠 Todas las Propiedades</button>
          <button onClick={() => navigate('/')}>🌐 Ver Sitio Web</button>
        </nav>
        
        <div className="master-sidebar-footer">
          <button className="btn-logout-master" onClick={handleLogout}>
            🚪 Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="master-main">
        <header className="master-header">
          <h1>Control Central InmoBrito</h1>
          <button className="btn-refresh" onClick={fetchData}>🔄 Actualizar Datos</button>
        </header>

        <div className="master-container">
          
          {activeTab === 'stats' && stats && (
            <div className="stats-grid fade-in">
              <div className="stat-card">
                <h3>Total Propiedades</h3>
                <p className="stat-number">{stats.totalProperties}</p>
                <span className="stat-label">En toda la plataforma</span>
              </div>
              <div className="stat-card orange">
                <h3>Destacadas</h3>
                <p className="stat-number">{stats.featuredProperties}</p>
                <span className="stat-label">En página de inicio</span>
              </div>
              <div className="stat-card blue">
                <h3>Asesores Activos</h3>
                <p className="stat-number">{stats.totalUsers}</p>
                <span className="stat-label">Cuentas registradas</span>
              </div>
              <div className="stat-card green">
                <h3>Precio Promedio</h3>
                <p className="stat-number">${stats.avgPrice?.toLocaleString()}</p>
                <span className="stat-label">USD por inmueble</span>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="master-table-card fade-in">
              <div className="table-header">
                <h2>Directorio de Asesores</h2>
                <input 
                  type="text" 
                  placeholder="Buscar por nombre o email..." 
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  className="table-search"
                />
              </div>
              <table className="master-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Registro</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.name.toLowerCase().includes(searchUser.toLowerCase())).map(user => (
                    <tr key={user._id}>
                      <td className="font-bold">{user.name}</td>
                      <td>{user.email}</td>
                      <td><span className={`role-pill ${user.role}`}>{user.role}</span></td>
                      <td>
                        <span className={`status-dot ${user.status}`}></span>
                        {user.status === 'active' ? 'Activo' : 'Suspendido'}
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className={`btn-action ${user.status === 'active' ? 'suspend' : 'activate'}`}
                          onClick={() => handleToggleUserStatus(user._id, user.status)}
                        >
                          {user.status === 'active' ? 'Suspender' : 'Activar'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'props' && (
            <div className="master-table-card fade-in">
              <div className="table-header">
                <h2>Inventario Global de Inmuebles</h2>
                <div className="table-filters">
                  <select onChange={(e) => setSearchUser(e.target.value)} className="table-select">
                    <option value="">Filtrar por Asesor</option>
                    {[...new Set(properties.map(p => p.owner?.name))].filter(Boolean).map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <table className="master-table">
                <thead>
                  <tr>
                    <th>Propiedad</th>
                    <th>Asesor</th>
                    <th>Precio</th>
                    <th>Ubicación</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {properties
                    .filter(p => !searchUser || p.owner?.name === searchUser)
                    .map(prop => (
                    <tr key={prop._id}>
                      <td>
                        <div className="prop-info-cell">
                          <img src={prop.images[0]} alt="" className="table-img" />
                          <span>{prop.title}</span>
                        </div>
                      </td>
                      <td>{prop.owner?.name || 'Sistema'}</td>
                      <td className="font-bold text-primary">${prop.price.toLocaleString()}</td>
                      <td>{prop.municipio}</td>
                      <td>{prop.type}</td>
                      <td>{prop.featured ? '⭐ Sí' : 'No'}</td>
                      <td>
                        <button className="btn-action view" onClick={() => navigate(`/propiedad/${prop._id}`)}>Ver</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MasterDashboard;

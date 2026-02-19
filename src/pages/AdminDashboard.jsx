import { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('stats');

    // Mock Data
    const stats = {
        totalProperties: 124,
        featured: 15,
        users: 45,
        cities: [
            { name: 'Caracas', count: 80 },
            { name: 'Valencia', count: 30 },
            { name: 'Maracaibo', count: 14 }
        ],
        recentContacts: [
            { id: 1, name: 'Juan Pérez', property: 'Casa en Altos', date: 'Hace 2h' },
            { id: 2, name: 'María Gómez', property: 'Apto Golf', date: 'Hace 5h' },
            { id: 3, name: 'Carlos Díaz', property: 'Lote Mamonal', date: 'Ayer' },
        ]
    };

    const properties = [
        { id: 'IMG-001', title: 'Casa Moderna Piscina', owner: 'Pedro Lopez', price: '$450,000', status: 'Venta', featured: true },
        { id: 'IMG-002', title: 'Apartamento Lujo', owner: 'Ana Villa', price: '$2,500/m', status: 'Alquiler', featured: false },
        { id: 'IMG-003', title: 'Oficina Centro', owner: 'Inversiones SAS', price: '$1,200/m', status: 'Alquiler', featured: false },
        { id: 'IMG-004', title: 'Lote Campestre', owner: 'Juan Valdez', price: '$80,000', status: 'Venta', featured: true },
    ];

    const users = [
        { id: 'USR-01', name: 'Miguel Brito', email: 'miguel@admin.com', type: 'Admin', status: 'Activo' },
        { id: 'USR-02', name: 'Pedro Lopez', email: 'pedro@gmail.com', type: 'Propietario', status: 'Activo' },
        { id: 'USR-03', name: 'Ana Villa', email: 'ana@hotmail.com', type: 'Propietario', status: 'Pendiente' },
    ];

    return (
        <div className="admin-dashboard">
            {/* Header Admin Específico */}
            <header className="admin-header">
                <div className="container admin-header-content">
                    <div className="admin-logo">InmoBrito <span className="admin-badge">ADMIN</span></div>
                    <nav className="admin-nav">
                        <button 
                            className={`admin-nav-item ${activeTab === 'stats' ? 'active' : ''}`}
                            onClick={() => setActiveTab('stats')}
                        >
                            Estadísticas
                        </button>
                        <button 
                            className={`admin-nav-item ${activeTab === 'properties' ? 'active' : ''}`}
                            onClick={() => setActiveTab('properties')}
                        >
                            Propiedades
                        </button>
                        <button 
                            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
                            onClick={() => setActiveTab('users')}
                        >
                            Usuarios
                        </button>
                    </nav>
                    <button className="btn-logout">Cerrar Sesión</button>
                </div>
            </header>

            <main className="container admin-content">
                
                {/* VISTA ESTADÍSTICAS */}
                {activeTab === 'stats' && (
                    <div className="stats-view animate-fade">
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Total Propiedades</h3>
                                <p className="stat-number">{stats.totalProperties}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Destacadas</h3>
                                <p className="stat-number highlight">{stats.featured}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Usuarios</h3>
                                <p className="stat-number">{stats.users}</p>
                            </div>
                            <div className="stat-card bg-primary">
                                <h3 className="text-white">Nuevos Leads</h3>
                                <p className="stat-number text-white">12</p>
                            </div>
                        </div>

                        <div className="stats-secondary-grid">
                            <div className="panel">
                                <h3>Propiedades por Ciudad</h3>
                                <ul className="city-list">
                                    {stats.cities.map((city, idx) => (
                                        <li key={idx}>
                                            <span>{city.name}</span>
                                            <span className="count-badge">{city.count}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="panel">
                                <h3>Solicitudes Recientes</h3>
                                <ul className="activity-list">
                                    {stats.recentContacts.map(contact => (
                                        <li key={contact.id}>
                                            <span className="activity-user">{contact.name}</span>
                                            <span className="activity-desc">interesado en <strong>{contact.property}</strong></span>
                                            <span className="activity-time">{contact.date}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* VISTA PROPIEDADES */}
                {activeTab === 'properties' && (
                    <div className="properties-view animate-fade">
                        <div className="view-header">
                            <h2>Gestión de Propiedades</h2>
                            <button className="btn btn-primary small">Nueva Propiedad</button>
                        </div>
                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Título</th>
                                        <th>Propietario</th>
                                        <th>Precio</th>
                                        <th>Estado</th>
                                        <th>Featured</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties.map(prop => (
                                        <tr key={prop.id}>
                                            <td className="text-mono">{prop.id}</td>
                                            <td>{prop.title}</td>
                                            <td>{prop.owner}</td>
                                            <td className="font-bold">{prop.price}</td>
                                            <td><span className={`status-pill ${prop.status.toLowerCase()}`}>{prop.status}</span></td>
                                            <td>{prop.featured ? '⭐' : '-'}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="btn-icon edit" title="Editar">✏️</button>
                                                    <button className="btn-icon delete" title="Eliminar">🗑️</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* VISTA USUARIOS */}
                {activeTab === 'users' && (
                    <div className="users-view animate-fade">
                        <div className="view-header">
                            <h2>Gestión de Usuarios</h2>
                            <button className="btn btn-primary small">Nuevo Usuario</button>
                        </div>
                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Tipo</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td className="text-mono">{user.id}</td>
                                            <td><div className="user-cell"><span className="user-avatar-sm">{user.name.charAt(0)}</span> {user.name}</div></td>
                                            <td>{user.email}</td>
                                            <td>{user.type}</td>
                                            <td><span className={`status-dot ${user.status === 'Activo' ? 'active' : 'pending'}`}></span> {user.status}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="btn-icon edit">✏️</button>
                                                    <button className="btn-icon delete">🗑️</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default AdminDashboard;

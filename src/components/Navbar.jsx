import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, userData, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Monitorear scroll para el botón Back to Top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-container">
          {/* LOGO */}
          <Link to="/" className="logo">
            Inmo<span className="logo-accent">Brito</span>
          </Link>

          {/* MENÚ DE NAVEGACIÓN */}
          <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            <div className="nav-links">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Inicio</Link>
              <Link to="/propiedades" className={`nav-link ${location.pathname === '/propiedades' ? 'active' : ''}`}>Propiedades</Link>
              <Link to="/contacto" className={`nav-link ${location.pathname === '/contacto' ? 'active' : ''}`}>Contacto</Link>
            </div>
            
            <div className="nav-buttons">
              {!isLoggedIn ? (
                /* MENÚ PÚBLICO: USUARIO NO LOGUEADO */
                <button className="btn-my-account" onClick={() => setIsAuthModalOpen(true)}>
                  <span>👤</span> Iniciar Sesión
                </button>
              ) : (
                /* MENÚ PRIVADO: USUARIO LOGUEADO */
                <div className="profile-dropdown-container">
                  <button 
                    className={`btn-profile-trigger ${isProfileOpen ? 'active' : ''}`}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <span className="user-avatar">👤</span>
                    <span className="user-name">{userData?.name?.split(' ')[0] || 'Mi Perfil'}</span>
                    <span className="arrow-down">▾</span>
                  </button>

                  {isProfileOpen && (
                    <div className="profile-dropdown-menu fade-in">
                      <div className="dropdown-header">
                        <p className="user-full-name">{userData?.name}</p>
                        <p className="user-email-small">{userData?.email}</p>
                      </div>
                      <div className="dropdown-divider"></div>
                      {userData?.role === 'master' ? (
                        <Link to="/master" className="dropdown-item master-link">
                          <span className="icon">👑</span> Panel Maestro
                        </Link>
                      ) : (
                        <Link to="/vender" className="dropdown-item">
                          <span className="icon">📊</span> Mi Panel
                        </Link>
                      )}
                      <button onClick={() => {navigate('/vender'); setIsMenuOpen(false);}} className="dropdown-item">
                        <span className="icon">➕</span> Vender Propiedad
                      </button>
                      <Link to="/vender" className="dropdown-item">
                        <span className="icon">⚙️</span> Configuración
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item logout-btn" onClick={handleLogout}>
                        <span className="icon">🚪</span> Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* BOTÓN HAMBURGUESA MÓVIL */}
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className={`bar ${isMenuOpen ? "active" : ""}`}></span>
            <span className={`bar ${isMenuOpen ? "active" : ""}`}></span>
            <span className={`bar ${isMenuOpen ? "active" : ""}`}></span>
          </div>
        </div>

        {/* MODAL DE AUTENTICACIÓN */}
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          onAuthSuccess={() => {
            setIsAuthModalOpen(false);
            // No redirigimos al Dashboard automáticamente al login 
            // para que el usuario pueda seguir navegando.
          }}
        />
      </nav>

      {/* BOTÓN BACK TO TOP */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`} 
        onClick={scrollToTop}
        title="Volver arriba"
      >
        ↑
      </button>
    </>
  );
};

export default Navbar;

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Handlers must be defined after hooks but can be before the early return
  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    return password.length >= minLength && hasNumber && hasUpperCase;
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateEmail(formData.email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('La contraseña debe tener al menos 8 caracteres, un número y una letra mayúscula.');
      return;
    }

    setIsLoading(true);
    try {
      const endpoint = activeTab === 'login' ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Algo salió mal');
      }

      // Guardar sesión usando Context
      login(data.token, data.user);
      
      onAuthSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Early return ALWAYS after all Hook calls
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container fade-up">
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-tabs">
          <button 
            className={`modal-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); setError(''); }}
          >
            Iniciar Sesión
          </button>
          <button 
            className={`modal-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => { setActiveTab('register'); setError(''); }}
          >
            Crear Cuenta
          </button>
        </div>

        <div className="modal-body">
          <div className="social-auth">
            <button className="btn-social google">
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
              Continuar con Google
            </button>
            <button className="btn-social facebook">
              <img src="https://www.svgrepo.com/show/330401/facebook.svg" alt="Facebook" />
              Continuar con Facebook
            </button>
          </div>

          <div className="auth-divider">
            <span>o con tu correo</span>
          </div>

          {error && <div className="auth-error">{error}</div>}

          {activeTab === 'login' ? (
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="ejemplo@correo.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary full-width" disabled={isLoading}>
                {isLoading ? 'Ingresando...' : 'Ingresar'}
              </button>
              <p className="auth-switch">
                ¿No tienes cuenta? <span onClick={() => setActiveTab('register')}>Regístrate aquí</span>
              </p>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre Completo</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Tu nombre" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="ejemplo@correo.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="8+ caracteres, Mayúscula y Número" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary full-width" disabled={isLoading}>
                {isLoading ? 'Registrando...' : 'Registrarse'}
              </button>
              <p className="auth-switch">
                ¿Ya tienes cuenta? <span onClick={() => setActiveTab('login')}>Inicia sesión</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetail from './pages/PropertyDetail';
import PublishPage from './pages/PublishPage';
import AdminDashboard from './pages/AdminDashboard';
import MasterDashboard from './pages/MasterDashboard';
import ContactPage from './pages/ContactPage';
import ChatIA from './components/ChatIA';
import './App.css';

function App() {
  const location = useLocation();
  
  // Ocultar Navbar y Footer en rutas de Dashboard (vender), Admin y Master
  const hideNavAndFooter = ['/vender', '/admin', '/master'].includes(location.pathname);

  return (
    <div className="app">
      {!hideNavAndFooter && <Navbar />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/propiedades" element={<PropertiesPage />} />
        <Route path="/propiedad/:id" element={<PropertyDetail />} />
        <Route path="/vender" element={<PublishPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/master" element={<MasterDashboard />} />
      </Routes>
      
      {!hideNavAndFooter && <Footer />}
      
      {/* Botón de Chat IA disponible globalmente */}
      <ChatIA />
    </div>
  );
}

export default App;

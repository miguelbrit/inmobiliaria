import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" id="contacto">
            <div className="container footer-container">
                <div className="footer-col">
                    <h3>Inmo<span className="logo-accent">Brito</span></h3>
                    <p>Tu aliado confiable para encontrar el hogar de tus sueños.</p>
                </div>
                <div className="footer-col">
                    <h4>Enlaces</h4>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/propiedades">Propiedades</Link></li>
                        <li><Link to="/vender">Vender</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Contacto</h4>
                    <p>Av. Francisco de Miranda</p>
                    <p>Caracas, Venezuela</p>
                    <p>info@inmobrito.com</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy;2026 InmoBrito. Todos los derechos reservados. Realizado por <a href="https://soymiguelbrito.com" target="_blank" rel="noopener noreferrer" className="credits-link">SoyMiguelBrito</a>.</p>
            </div>
        </footer>
    );
};

export default Footer;

import './ContactPage.css';

const ContactPage = () => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Mensaje enviado. ¡Te contactaremos pronto!');
    };

    return (
        <div className="contact-page">
            <div className="contact-hero">
                <h1>Contáctanos</h1>
                <p>Estamos aquí para ayudarte a encontrar tu hogar ideal</p>
            </div>

            <div className="container">
                <div className="contact-wrapper">
                    
                    {/* Información de Contacto */}
                    <div className="contact-info">
                        <h2>Información General</h2>
                        <p className="info-intro">
                            ¿Tienes preguntas sobre alguna propiedad o quieres vender la tuya? 
                            Escríbenos y un asesor se pondrá en contacto contigo.
                        </p>

                        <div className="info-item">
                            <span className="info-icon">📍</span>
                            <div>
                                <h3>Visítanos</h3>
                                <p>Av. Francisco de Miranda, Edif. Torre Cavendes</p>
                                <p>Caracas, Venezuela</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <span className="info-icon">📞</span>
                            <div>
                                <h3>Llámanos</h3>
                                <p>+58 (212) 123-4567</p>
                                <p>+58 (412) 355-5555</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <span className="info-icon">📧</span>
                            <div>
                                <h3>Escríbenos</h3>
                                <p>info@inmobrito.com</p>
                                <p>ventas@inmobrito.com</p>
                            </div>
                        </div>

                        <div className="social-links">
                            <a href="#" className="social-icon">Instagram</a>
                            <a href="#" className="social-icon">Facebook</a>
                            <a href="#" className="social-icon">WhatsApp</a>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="contact-form-container">
                        <form className="contact-page-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nombre Completo</label>
                                <input type="text" placeholder="Tu nombre" required />
                            </div>
                            
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="tucorreo@ejemplo.com" required />
                            </div>

                            <div className="form-group">
                                <label>Teléfono</label>
                                <input type="tel" placeholder="+57 300..." />
                            </div>

                            <div className="form-group">
                                <label>Asunto</label>
                                <select>
                                    <option>Información General</option>
                                    <option>Quiero Comprar</option>
                                    <option>Quiero Vender</option>
                                    <option>Soporte</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Mensaje</label>
                                <textarea rows="5" placeholder="¿En qué podemos ayudarte?" required></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary full-width">Enviar Mensaje</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactPage;

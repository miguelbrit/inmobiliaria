import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import './ChatIA.css';

const ChatIA = () => {
    const { isLoggedIn, userData } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([
        { type: 'bot', text: '¡Hola! soy tu asesor virtual InmoBrito. ¿Buscas comprar o alquilar en Caracas?' }
    ]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    // Scroll al final al recibir mensajes
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    // Cargar historial si está logueado
    useEffect(() => {
        if (isLoggedIn && isOpen) {
            fetchHistory();
        }
    }, [isLoggedIn, isOpen]);

    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/chat/history', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok && data.length > 0) {
                const history = data.flatMap(item => [
                    { type: 'user', text: item.message },
                    { type: 'bot', text: item.response }
                ]);
                setChat(prev => [...prev, ...history]);
            }
        } catch (error) {
            console.error('Error al cargar historial:', error);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMsg = { type: 'user', text: message };
        setChat(prev => [...prev, userMsg]);
        setMessage('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message, 
                    userId: userData?.id 
                })
            });
            const data = await res.json();
            setChat(prev => [...prev, { type: 'bot', text: data.response }]);
        } catch (error) {
            setChat(prev => [...prev, { type: 'bot', text: 'Lo siento, tuve un problema de conexión. Inténtalo de nuevo.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
            {/* Botón Flotante */}
            <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '✕' : '💬'}
            </button>

            {/* Ventana de Chat */}
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="bot-info">
                            <span className="bot-avatar">🤖</span>
                            <div>
                                <h4>Asesor Virtual</h4>
                                <p>En línea</p>
                            </div>
                        </div>
                    </div>

                    <div className="chat-body">
                        {chat.map((msg, thumb) => (
                            <div key={thumb} className={`chat-bubble ${msg.type}`}>
                                {msg.text}
                            </div>
                        ))}
                        {loading && <div className="chat-bubble bot typing">Escribiendo...</div>}
                        <div ref={chatEndRef} />
                    </div>

                    <form className="chat-footer" onSubmit={handleSend}>
                        <input 
                            type="text" 
                            placeholder="Escribe tu consulta..." 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit" disabled={loading}>Enviar</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatIA;

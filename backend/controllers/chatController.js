const Appointment = require('../models/Appointment');
const Chat = require('../models/Chat');
const Property = require('../models/Property');

// Función para simular o llamar a la IA
const getAIResponse = async (userMessage, properties) => {
    const message = userMessage.toLowerCase();
    
    // 1. Lógica de Agendamiento
    if (message.includes('agendar') || message.includes('cita') || message.includes('visita')) {
        return "¡Claro! Me encantaría ayudarte a agendar una visita. ¿Qué día te gustaría ir? (Ej: Mañana a las 10am). También dime qué propiedad te interesa.";
    }

    if (message.includes('confirma') || message.includes('lunes') || message.includes('martes') || message.includes('miércoles') || message.includes('jueves') || message.includes('viernes')) {
        return "Perfecto, he recibido tu solicitud de cita. Un asesor se comunicará contigo en breve por WhatsApp para confirmar la hora exacta. ¿Deseas consultar algo más sobre nuestros inmuebles?";
    }

    // 2. Lógica de Recomendación (Existente)
    const propertySummary = properties.map(p => 
        `- ${p.title} en ${p.municipio}: $${p.price} (${p.type})`
    ).join('\n');

    if (message.includes('precio') || message.includes('barato') || message.includes('económico')) {
        const cheap = properties.sort((a, b) => a.price - b.price)[0];
        return `Entiendo. La opción más económica es "${cheap.title}" en ${cheap.municipio} por $${cheap.price.toLocaleString()}. ¿Te gustaría agendar una cita para verla?`;
    }

    if (message.includes('chacao') || message.includes('hatillo') || message.includes('sucre') || message.includes('baruta') || message.includes('libertador')) {
        const found = properties.find(p => message.includes(p.municipio.toLowerCase()));
        if (found) {
            return `¡Tengo una excelente opción en esa zona! Un ${found.type} en ${found.municipio} por $${found.price.toLocaleString()}. ¿Deseas que agendemos una visita para hoy mismo?`;
        }
    }

    return "Hola, soy tu asesor virtual. Puedo recomendarte las mejores propiedades de Caracas y agendar tus visitas. ¿En qué zona buscas y cuándo te gustaría visitar nuestras propiedades?";
};

exports.sendMessage = async (req, res) => {
    try {
        const { message, userId } = req.body;
        
        // 1. Obtener inventario real para que la IA sepa qué recomendar
        const properties = await Property.find({ status: 'Venta' }).limit(10);
        
        // 2. Obtener respuesta (IA Real o Simulada)
        const aiResponse = await getAIResponse(message, properties);
        
        // 3. Guardar en MongoDB
        const newChat = new Chat({
            user: userId || null,
            message: message,
            response: aiResponse
        });
        await newChat.save();
        
        res.json({ response: aiResponse });
    } catch (error) {
        res.status(500).json({ message: 'Error en el chat', error: error.message });
    }
};

exports.getChatHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const history = await Chat.find({ user: userId }).sort({ createdAt: 1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener historial', error: error.message });
    }
};

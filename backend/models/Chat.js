const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: false // Puede ser anónimo o logueado
    },
    message: { 
        type: String, 
        required: true 
    },
    response: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

module.exports = mongoose.model('Chat', ChatSchema);

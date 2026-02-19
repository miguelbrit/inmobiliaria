const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: false 
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    clientName: String,
    clientPhone: String
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);

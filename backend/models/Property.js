const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true }, // Dirección detallada
    estado: { type: String, required: true, default: 'Distrito Capital' },
    municipio: { type: String, required: true },
    type: { type: String, required: true }, // Casa, Apartamento, etc.
    description: { type: String },
    beds: { type: Number },
    baths: { type: Number },
    area: { type: Number }, // Metros cuadrados (numérico)
    seguridad: { type: Boolean, default: false },
    status: { type: String, default: 'Venta' },
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    leads: { type: Number, default: 0 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Referencia al usuario/asesor
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);

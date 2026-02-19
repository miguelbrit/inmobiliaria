const User = require('../models/User');
const Property = require('../models/Property');

// Obtener todos los asesores (y admins)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'master' } }).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};

// Obtener todas las propiedades de todos los asesores
exports.getAllPropertiesMaster = async (req, res) => {
    try {
        const properties = await Property.find().populate('owner', 'name email').sort({ createdAt: -1 });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener propiedades', error: error.message });
    }
};

// Actualizar estado o rol de un usuario
exports.updateUserStatus = async (req, res) => {
    try {
        const { status, role } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { status, role }, { new: true }).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar usuario', error: error.message });
    }
};

// Editar cualquier propiedad
exports.updatePropertyMaster = async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProperty) return res.status(404).json({ message: 'Propiedad no encontrada' });
        res.json(updatedProperty);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar propiedad', error: error.message });
    }
};

// Estadísticas para el Master
exports.getMasterStats = async (req, res) => {
    try {
        const totalProperties = await Property.countDocuments();
        const featuredProperties = await Property.countDocuments({ featured: true });
        const totalUsers = await User.countDocuments({ role: 'agent' });
        
        const properties = await Property.find({}, 'price');
        const avgPrice = properties.length > 0 
            ? properties.reduce((acc, p) => acc + p.price, 0) / properties.length 
            : 0;

        res.json({
            totalProperties,
            featuredProperties,
            totalUsers,
            avgPrice: Math.round(avgPrice)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estadísticas', error: error.message });
    }
};

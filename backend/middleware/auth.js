const jwt = require('jsonwebtoken');

// Middleware base para verificar TOKEN
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Acceso denegado. No se encontró el token de seguridad.' });
    }

    let token = authHeader;
    if (authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }
    token = token?.trim();

    if (!token) {
        return res.status(401).json({ message: 'Formato de token inválido.' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ message: 'Error de configuración.' });

    try {
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Sesión inválida o expirada.' });
    }
};

// Middleware para verificar ROLES
const verifyRole = (roles) => {
    return (req, res, next) => {
        // Asumiendo que el token tiene el rol. Si no, habría que buscar el usuario en la DB
        // Para mayor seguridad, mejor buscarlo en la DB
        const User = require('../models/User');
        User.findById(req.user.id).then(user => {
            if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
            
            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: 'Acceso restringido: No tienes permisos suficientes.' });
            }
            
            if (user.status === 'inactive') {
                return res.status(403).json({ message: 'Cuenta desactivada. Contacta al soporte.' });
            }

            req.userData = user; // Guardar datos completos del usuario
            next();
        }).catch(err => res.status(500).json({ message: 'Error al verificar permisos.' }));
    };
};

module.exports = { verifyToken, verifyRole };

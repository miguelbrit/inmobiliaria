const express = require('express');
const router = express.Router();
const masterController = require('../controllers/masterController');
const { verifyToken, verifyRole } = require('../middleware/auth');

// Todas estas rutas requieren TOKEN y ROL DE 'master'
router.use(verifyToken);
router.use(verifyRole(['master']));

// Rutas de Usuarios
router.get('/users', masterController.getAllUsers);
router.put('/users/:id', masterController.updateUserStatus);

// Rutas de Propiedades
router.get('/properties', masterController.getAllPropertiesMaster);
router.put('/properties/:id', masterController.updatePropertyMaster);

// Estadísticas
router.get('/stats', masterController.getMasterStats);

module.exports = router;

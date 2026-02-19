const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Rutas públicas
router.get('/', propertyController.getAllProperties);
router.get('/options', propertyController.getFilterOptions); // Nueva ruta para opciones dinámicas
router.get('/:id', propertyController.getPropertyById);

// Rutas protegidas (Asesores, Admins, Master)
router.post('/', verifyToken, upload.array('images', 5), propertyController.createProperty);
router.put('/:id', verifyToken, upload.array('images', 5), propertyController.updateProperty);
router.delete('/:id', verifyToken, propertyController.deleteProperty);

module.exports = router;

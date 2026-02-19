const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { verifyToken } = require('../middleware/auth');

// Ruta para enviar mensaje (Abierta o protegida según desees, aquí opcional)
router.post('/', chatController.sendMessage);

// Historial protegido (solo usuarios logueados)
router.get('/history', verifyToken, chatController.getChatHistory);

module.exports = router;

const express = require('express');
const router = express.Router();
const tecnologiaController = require('../controllers/tecnologiaController');

router.get('/', tecnologiaController.listar);
router.post('/', tecnologiaController.crear);
router.get('/:id', tecnologiaController.obtenerPorId);
router.put('/:id', tecnologiaController.actualizar);
router.delete('/:id', tecnologiaController.eliminar);

module.exports = router;
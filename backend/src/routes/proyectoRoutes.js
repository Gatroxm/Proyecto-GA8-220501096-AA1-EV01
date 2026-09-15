const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

router.get('/resumen', proyectoController.resumen);
router.get('/', proyectoController.listar);
router.post('/', proyectoController.crear);
router.get('/:id', proyectoController.obtenerPorId);
router.put('/:id', proyectoController.actualizar);
router.delete('/:id', proyectoController.eliminar);

module.exports = router;
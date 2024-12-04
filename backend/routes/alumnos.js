const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumnoController');

// Rutas
router.get('/', alumnoController.mostrar);
router.post('/', alumnoController.crear);
router.put('/:id', alumnoController.editar);
router.delete('/:id', alumnoController.borrar);
router.post('/:id/tareas', alumnoController.agregarTarea);
router.delete('/:id/tareas/:tareaId', alumnoController.borrarTarea);

module.exports = router;

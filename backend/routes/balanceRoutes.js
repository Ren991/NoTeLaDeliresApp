const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');

//Crear balance
router.post('/anual/:userId', balanceController.createAnnualBalance);
//modificar categoría
router.put('/categoria/:userId/:categoriaId', balanceController.updateCategory);
//eliminar categoría
router.delete('/categoria/:userId/:categoriaId', balanceController.deleteCategory);
//añadir categoría
router.post('/categoria/:userId', balanceController.addCategory);
// obtener datos del usuario
router.get('/tabla/:userId', balanceController.getUserTable);

module.exports = router;

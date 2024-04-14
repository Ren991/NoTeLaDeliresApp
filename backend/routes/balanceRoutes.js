// balance.routes.js

const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balance.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/anual', authMiddleware, balanceController.createAnnualBalance);
router.put('/categoria/:categoriaId', authMiddleware, balanceController.updateCategory);
router.delete('/categoria/:categoria', authMiddleware, balanceController.deleteCategory);
router.post('/categoria', authMiddleware, balanceController.addCategory);

module.exports = router;

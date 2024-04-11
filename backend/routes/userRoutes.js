const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/registrarse', userController.registrarse);
router.post('/iniciar-sesion', userController.iniciarSesion);
router.delete('/eliminar-usuario', userController.eliminarUsuario);
router.get('/todos', userController.obtenerTodosUsuarios);


module.exports = router;

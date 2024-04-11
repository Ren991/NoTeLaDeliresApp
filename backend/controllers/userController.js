const User = require('../models/user');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Configurar transporte para SendGrid
const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.registrarse = async (req, res) => {
  try {
    const { nombre, apellido, mail, contraseña } = req.body;

    // Verificar si el correo electrónico ya existe en la base de datos
    const existingUser = await User.findOne({ mail });

    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    // Validar la contraseña
    if (contraseña.length < 8) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
    }

    // Verificar si hay al menos un carácter especial en la contraseña
    const specialCharRegex = /[\W_]/;
    if (!specialCharRegex.test(contraseña)) {
      return res.status(400).json({ error: 'La contraseña debe contener al menos un carácter especial' });
    }

    // Verificar si hay al menos una letra mayúscula en la contraseña
    const uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(contraseña)) {
      return res.status(400).json({ error: 'La contraseña debe contener al menos una letra mayúscula' });
    }

    // Hash de la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const user = new User({ nombre, apellido, mail, contraseña: hashedPassword });
    await user.save();

    // Generar token JWT
    const token = generateAccessToken(user);

    // Enviar token en la respuesta
    res.json({ message: 'Usuario registrado exitosamente', token });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

exports.iniciarSesion = async (req, res) => {
  try {
    const { mail, contraseña } = req.body;

    // Buscar al usuario por su correo electrónico
    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    // Verificar la contraseña
    const contraseñaValida = await bcrypt.compare(contraseña, user.contraseña);
    if (!contraseñaValida) {
      return res.status(401).send('Contraseña incorrecta');
    }

    // Verificar si el usuario está activo
    if (!user.activo) {
      return res.status(401).send('El usuario no ha verificado su correo electrónico');
    }

    // Generar token de autenticación
    const token = jwt.sign({ mail }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const { mail } = req.body;

    // Buscar y eliminar al usuario por su correo electrónico
    const usuarioEliminado = await User.findOneAndDelete({ mail });

    if (!usuarioEliminado) {
      // El usuario no existe
      return res.status(404).send('El usuario no existe');
    }

    res.status(200).send('Usuario eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.obtenerTodosUsuarios = async (req, res) => {
    try {
      const usuarios = await User.find({}, { contraseña: 0 }); // Excluimos la contraseña de la respuesta
      res.status(200).json(usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).send('Error interno del servidor');
    }
  };

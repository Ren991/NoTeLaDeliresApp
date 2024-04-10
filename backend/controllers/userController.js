const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

exports.registrarse = async (req, res) => {
  try {
    const { nombre, apellido, mail, contraseña } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ mail });
    if (existingUser) {
      return res.status(400).send('El usuario ya está registrado');
    }

    // Crear nuevo usuario sin activar
    const user = new User({ nombre, apellido, mail, contraseña, activo: false });
    await user.save();

    // Generar token de verificación de correo electrónico
    const token = jwt.sign({ mail }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Enviar correo electrónico de verificación
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificacionUrl = `${process.env.APP_URL}/verificar-correo?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: mail,
      subject: 'Verifica tu correo electrónico',
      html: `Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico: <a href="${verificacionUrl}">${verificacionUrl}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).send('Se ha enviado un correo electrónico de verificación. Por favor, verifica tu correo electrónico para completar el registro.');
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.verificarCorreo = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send('Falta el token de verificación');
    }

    // Verificar el token de verificación de correo electrónico
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Activar al usuario
    await User.findOneAndUpdate({ mail: decoded.mail }, { activo: true });

    res.status(200).send('Correo electrónico verificado correctamente. Ahora puedes iniciar sesión.');
  } catch (error) {
    console.error('Error al verificar correo electrónico:', error);
    res.status(500).send('Error interno del servidor');
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

    // Eliminar al usuario por su correo electrónico
    await User.findOneAndDelete({ mail });

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

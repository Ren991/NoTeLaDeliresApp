const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
});

// Middleware para hashear la contraseña antes de guardarla en la base de datos
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('contraseña')) return next();
  const hashedPassword = await bcrypt.hash(user.contraseña, 10);
  user.contraseña = hashedPassword;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

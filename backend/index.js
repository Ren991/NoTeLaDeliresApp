const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const balanceRoutes = require('./routes/balanceRoutes')
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI);

// Middleware para parsear el cuerpo de las peticiones como JSON
app.use(express.json());

// Rutas de usuario
app.use('/usuarios', userRoutes);
app.use('/balance',balanceRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('¡Bienvenido a NoTeLaDelires app!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


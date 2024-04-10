const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
.then(() => {
  console.log('Conexión a MongoDB establecida correctamente');
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});
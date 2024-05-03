const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://<usuario>:<contraseña>@<cluster>/<base_de_datos>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB Atlas');
});

// Definir un esquema para la colección de temperaturas
const temperaturaSchema = new mongoose.Schema({
  temperatura: Number,
  fecha: { type: Date, default: Date.now }
});
const Temperatura = mongoose.model('Temperatura', temperaturaSchema);

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Ruta para recibir los datos de temperatura
app.post('/temperatura', async (req, res) => {
  try {
    const nuevaTemperatura = new Temperatura({
      temperatura: req.body.temperatura
    });
    await nuevaTemperatura.save();
    res.status(201).json({ message: 'Temperatura almacenada correctamente' });
  } catch (error) {
    console.error('Error al almacenar la temperatura:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

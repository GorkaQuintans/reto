//Inicializamos la app
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//Definimos la carpeta de contenido estático
app.use(express.static('public'))

//Necesario para parsear objetos JSON
app.use(express.json())

// Conexión a la base de datos MongoDB
async function conectarBD() {
    try {
        await mongoose.connect("mongodb+srv://martin:root@cyberdog.zeo7epx.mongodb.net/?retryWrites=true&w=majority&appName=cyberdog");
        console.log('Conexión a la BD correcta');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
    }
 }
 conectarBD();

//Ruta inicial
app.get('/', (req, res) => {
    console.log('Hola')
   // res.status(500).json( {mensaje: 'error'} )
   // res.download('index.js')
   res.send('test')
})

//Habilitamos EJS
app.set('view engine', 'ejs')

//Creamos los routers y sus rutas base
const logsRouter = require('./routes/logs')
app.use('/logs', logsRouter)

//Lanzamos la app
app.listen(300) 


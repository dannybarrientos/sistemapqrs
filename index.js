const express = require('express');
const routes = require('./routes');
const path = require('path');

//Helper con algunas Funciones
const helpers = require('./helper');


//TODO Crear la conexion a la BD
const db = require('./config/db');

//TODO Importar el Modelo de Bases de datos
require('./models/Proyectos');
require('./models/Tareas');


db.sync()
.then(() => console.log('Conectado al servidor'))
.catch(err => console.log(error))


//Crear una app de express
const app = express();

//TODO Donde se carga los archivos estaticos
app.use(express.static('public'));

//TODO Habilitar Pug
app.set('view engine', 'pug' )

//TODO Añadir la carpeta de las vistass
app.set('views', path.join(__dirname,'./views'))


//TODO pasar vardump en la vistas (//Estaran lo datos de forma local para poder ser accedidos desde cualquier lado)
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

//TODO Habilitar el body parser para leer los datos del formulario
//app.use(express.urlencoded())
app.use(express.urlencoded({extended: true}));

app.use('/', routes())

app.listen(3000);

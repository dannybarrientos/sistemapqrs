const express = require('express')
const routes = require('./routes')
const path = require('path')


//Crear una app de express
const app = express();

//TODO Donde se carga los archivos estaticos
app.use(express.static('public'));

//TODO Habilitar Pug
app.set('view engine', 'pug' )

//TODO Añadir la carpeta de las vistass
app.set('views', path.join(__dirname,'./views'))

//TODO Habilitar el body parser para leer los datos del formulario
app.use(express.urlencoded())

app.use('/', routes())

app.listen(3000);

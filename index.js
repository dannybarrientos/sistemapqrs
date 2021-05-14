const express = require('express')
const routes = require('./routes')
const path = require('path')
//Crear una app de express
const app = express();

//TODO Habilitar Pug
app.set('view engine', 'pug' )

//TODO Añadir la carpeta de las vistass
app.set('views', path.join(__dirname,'./views'))

app.use('/', routes())

app.listen(3000);

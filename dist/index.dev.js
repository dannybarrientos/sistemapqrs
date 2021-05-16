"use strict";

var express = require('express');

var routes = require('./routes');

var path = require('path');

var flash = require('connect-flash');

var session = require('express-session');

var cookieParser = require('cookie-parser');

var passport = require('./config/passport'); //Helper con algunas Funciones


var helpers = require('./helper'); //TODO Crear la conexion a la BD


var db = require('./config/db'); //TODO Importar el Modelo de Bases de datos


require('./models/Proyectos');

require('./models/Tareas');

require('./models/Usuarios');

db.sync().then(function () {
  return console.log('Conectado al servidor');
})["catch"](function (err) {
  return console.log(error);
}); //Crear una app de express

var app = express(); //TODO Donde se carga los archivos estaticos

app.use(express["static"]('public')); //TODO Habilitar Pug

app.set('view engine', 'pug'); //TODO Habilitar el body parser para leer los datos del formulario
//app.use(express.urlencoded())

app.use(express.urlencoded({
  extended: true
})); //TODO Añadir la carpeta de las vistass

app.set('views', path.join(__dirname, './views')); //TODO Agregar flash messages

app.use(flash()); //TODO Cookies parser

app.use(cookieParser()); //TODO Sessiones nos permite navegar entre distintas paginas sin volvernos autenticar

app.use(session({
  secret: 'supersecreto',
  resave: false,
  saveUninitialized: false
})); //TODO Uso Passport  lo que hace arrancar la instancia

app.use(passport.initialize());
app.use(passport.session()); //TODO pasar vardump en la vistas (//Estaran lo datos de forma local para poder ser accedidos desde cualquier lado)

app.use(function (req, res, next) {
  res.locals.vardump = helpers.vardump;
  res.locals.mensajes = req.flash();
  next();
});
app.use('/', routes());
app.listen(3000);
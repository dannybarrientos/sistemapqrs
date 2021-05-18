const express = require('express');
const routes = require('./routes');
const path = require('path');
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('./config/passport')

//Helper con algunas Funciones
const helpers = require('./helper');


//TODO Crear la conexion a la BD
const db = require('./config/db');

//TODO Importar el Modelo de Bases de datos
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

//TODO Conectar al servidor
db.sync()
.then(() => console.log('Conectado al servidor'))
.catch(err => console.log(error))


//Crear una app de express
const app = express();

//TODO Donde se carga los archivos estaticos
app.use(express.static('public'));

//TODO Habilitar Pug
app.set('view engine', 'pug' )

//TODO Habilitar el body parser para leer los datos del formulario
//app.use(express.urlencoded())
app.use(express.urlencoded({extended: true}));



//TODO Añadir la carpeta de las vistass
app.set('views', path.join(__dirname,'./views'))

//TODO Agregar flash messages
app.use(flash());

//TODO Cookies parser
app.use(cookieParser());

//TODO Sessiones nos permite navegar entre distintas paginas sin volvernos autenticar
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

//TODO Uso Passport  lo que hace arrancar la instancia

app.use(passport.initialize());
app.use(passport.session());

//TODO pasar vardump en la vistas (//Estaran lo datos de forma local para poder ser accedidos desde cualquier lado)
//TODO Este es un midleware
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuarios = {...req.user} || null;
    console.log(res.locals.usuarios);
    next();
});



app.use('/', routes())

app.listen(3000);
require('./headlers/email')
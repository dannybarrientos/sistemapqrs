const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const usuario = require('../models/Usuarios')

//TODO Utilizando la estrategia local, puedo agregar facebook o google por ahora local
exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

//TODO Funcion para revisar si el usuario esta loguerado o no
exports.usuarioAutenticado = (req, res, next) => {
    //TODO Si el usuario esta autenticado, adelante
    if(req.isAuthenticated()) {
        return next()
    }
    //TODO sino esta autenticado redirigir al formulario
    return res.redirect('/iniciar-sesion');

}

//TODO Funciona para cerrar Sesison
exports.cerrarSesion = (req, res) =>{
    req.session.destroy(() => {
        res.redirect('iniciar-sesion'); //Al cerrrar session nos lleva al login
    });

}

//TODO Generar un token si el usuario es valido
exports.enviarToken = async(req, res) => {
    //TODO verificar que el usuario exista
    const email = req.body.email
    const usuario = await Usuarios.findOne({where:{email}})

    //Si el usuario no existe
    if(!usuario) {
        req.flash('Error', 'No existe esa cuenta')
        res.render('restablecer', {
            nombrePagina: 'Restablecer tu constraseña',
            mensajes: req.flash()
        })
    }
}
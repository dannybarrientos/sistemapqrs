const passport = require('passport');

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
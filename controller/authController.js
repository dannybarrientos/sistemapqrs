const passport = require('passport');

//TODO Utilizando la estrategia local, puedo agregar facebook o google por ahora local
exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});
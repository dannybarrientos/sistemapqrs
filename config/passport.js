const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//TODO Referencia al modelo donde vamos a autenticar
const Usuarios = require('../models/Usuarios')

//TODO local strategy - Login con credenciales propios (Usuarios y password)

passport.use(
    new LocalStrategy(
        //TODO Por Default passport espera un usuario y password, pero como tenemos email lo sobrescribimos
        {
            usernameField: 'email',
            passwordField: 'password'

        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: {email:email}
                });
                //TODO EL usuario existe, pasword incorrecto
                if(!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        //TODO Variable propia de passport
                        message: 'El password Incorrecto'
                    });
                }
                //TODO el email existe y el password correcto
                return done(null,usuario)

            } catch (error) {
                //TODO Ese usuario no existe
                return done(null, false, {
                    //TODO Variable propia de passport
                    message: 'Ese usuario no existe'
                });

            }
        }
    )
);

//TODO Serielizar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

//TODO DeserializeUser el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

//TODO Exportar
module.exports = passport;
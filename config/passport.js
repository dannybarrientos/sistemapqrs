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
                const usuario = await Usuarios.find({
                    where: {email:email}
                });
                //TODO EL usuario existe, pasword incorrecto
                if(!usuario.verificarPassword(password)) {

                }

            } catch (error) {
                //TODO Ese usuario no existe
                return done(null, false, {
                    //TODO Variable propia de passport
                    message: 'Ese usuario no existe'
                });

            }
        }
    )
)

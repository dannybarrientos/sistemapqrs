const passport = require('passport');
const Usuarios = require('../models/Usuarios');

const crypto = require('crypto');

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
        req.flash('error', 'No existe esa cuenta')
        res.redirect('/restablecer');
    }
    //Usuario existes
    //TODO token
    usuario.token = crypto.randomBytes(20).toString('hex');
    //TODO Expiracion
    usuario.expiracion = Date.now() + 3600000
    //Guardarlos en la basde de datos
    await usuario.save();

    //Url de reset
    const resetUrl = `http://${req.headers.host}/restablecer/${usuario.token}`;
    console.log(resetUrl);
}

exports.resetPassword = async(req, res) => {
const usuario = await Usuarios.findOne({
    where:{
        token: req.params.token,
    }
  })
  //TODO Si no encuetra el usuario
  if(!usuario){
      req.flash('error','No valido')
      res.redirect('/restablecer');
  }
}
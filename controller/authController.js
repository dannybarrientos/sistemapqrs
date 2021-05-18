const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs')
const enviarEmail = require('../headlers/email')

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
    //TODO Usuario existes
    //TODO token
    usuario.token = crypto.randomBytes(20).toString('hex');
    //TODO Expiracion
    usuario.expiracion = Date.now() + 3600000
    //TODO Guardarlos en la basde de datos
    await usuario.save();

    //TODO Url de reset
    const resetUrl = `http://${req.headers.host}/restablecer/${usuario.token}`;

    //TODO Enviar el correo con el token

    await enviarEmail.enviar({
        usuario: usuario,
        subject: 'Password Reset',
        resetUrl,
        archivo :'reestablecer-password'
    })

    //TODO Terminar 
    req.flash('correcto', 'Se envio un mensaje a este correo solicitado');
    res.redirect('/iniciar-sesion');

}

exports.validarToken = async(req, res) => {
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

  //TODO Formulario para generar el password
  res.render('resetPassword', {
      nombrePagina: 'Reestablecer Contraseña'

  })
}
//TODO Cambiar el password por uno nuevo
exports.actualizarPassword = async(req, res) => {
    
    //TODO Verifica el token pero tambien la fecha de expiracion
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte]: Date.now()

            }
        }
    })
    //TODO Verificar si usuario existe para actualizar el password
    console.log("El usuario existe", usuario);
   if(!usuario) {
        req.flash('error', 'No valido');
        res.redirect('/restablecer');
    }
    //TODO hashear el password
    usuario.password =bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;

    //TODO Guardamos el nuevo password
    await usuario.save();
    req.flash('correcto', 'Tu password se ha modificado correctamente')
    res.redirect('/iniciar-sesion')
}
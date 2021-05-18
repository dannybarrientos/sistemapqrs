const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../headlers/email')

//TODO Formulario crearCuenta
exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en PQRS'
    });
}
//TODO Formulario IniciarSession
exports.formIniciarSession = (req, res) => {
    //TODO forma debugger
    //console.log(res.locals.mensajes);
    const {error} = res.locals.mensajes
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Session en PQRS',
        error : error
    });
}

exports.crearCuenta = async (req, res) => {
    //TODO Leer los datos VW
    const { email, password } = req.body;

    try {
        //TODO Crear el usuarios  //Esto es como el Insert
        await Usuarios.create({
        email,
        password,
    });
    //TODO Crear una URL de confirmar
    const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

    //TODO Crear el objeto de usuario
    const usuario = {
        email
    }


    //TODO Enviar el correo con el token
    await enviarEmail.enviar({
        usuario: usuario,
        subject: 'Confirma tu cuenta PQRS',
        confirmarUrl,
        archivo :'confirmar-cuenta'
    });
    //TODO Redirigir al usuario
    req.flash('correcto', 'Enviamos un correo, confirma tu cuenta')
    res.redirect('/iniciar-sesion')

    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crea cuenta en PQER',
            email,
            password,
        })

    }

}
exports.formRestablecerPassword = (req, res) => {
    res.render('restablecer', {
        nombrePagina:'Reestablecer tu contraseña'
    });

}
const Usuarios = require('../models/Usuarios')

//TODO Formulario crearCuenta
exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en PQRS'
    });
}
//TODO Formulario IniciarSession
exports.formIniciarSession = (req, res) => {
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Session en PQRS'
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
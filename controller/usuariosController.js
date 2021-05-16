const Usuarios = require('../models/Usuarios')
exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en PQRS'
    });
}

exports.crearCuenta = (req, res) => {
    //TODO Leer los datos

    const { email, password } = req.body;

    //TODO Crear el usuarios  //Esto es como el Insert
    Usuarios.create({
        email,
        password,
    })
    .then(() => {
        res.redirect('/iniciar-sesion')
    })
}
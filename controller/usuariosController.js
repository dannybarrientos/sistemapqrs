const Usuarios = require('../models/Usuarios')
exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en PQRS'
    });
}

exports.crearCuenta = async (req, res) => {
    //TODO Leer los datos
    const { email, password } = req.body;

    try {
        //TODO Crear el usuarios  //Esto es como el Insert
        await Usuarios.create({
        email,
        password,
    });
    res.redirect('/iniciar-sesion')

    } catch (error) {
        res.render('crearCuenta', {
            error: error.errors,
            nombrePagina: 'Crea cuenta en PQER'
        })

    }

}
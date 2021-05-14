exports.proyectoHome = (req, res) =>{
    res.render('index', {
        nombrePagina: 'Proyectos'
    });
}

exports.formularioProyecto = (req, res) =>{
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    });
}

exports.nuevoProyecto = (req, res) =>{
    //Enviar a la consola lo que envia el usuario
    console.log(req.body);
}
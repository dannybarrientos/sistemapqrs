exports.proyectoHome = (req, res) =>{
    res.render('index', {
        nombrePagina: 'Proyectos'
    });
}
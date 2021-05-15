const Proyectos = require('../models/Proyectos');

exports.proyectoHome = async (req, res) =>{
    
    //TODO mostrar en el vista de la bd, y como consulto para temas de performance
    const proyectos = await Proyectos.findAll();
    //TODO Pinto
    res.render('index', {
        nombrePagina: 'Proyectos' ,
        proyectos
    });
}

exports.formularioProyecto = async(req, res) =>{
     //TODO mostrar en el vista de la bd, y como consulto para temas de performance
     const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async(req, res) =>{
     //TODO mostrar en el vista de la bd, y como consulto para temas de performance
     const proyectos = await Proyectos.findAll();

    //Enviar a la consola lo que envia el usuario
   //console.log(req.body);

   //Validar que tengamos algo en el imput
   const { nombre } = req.body;

   let errores = [];
   
   if(!nombre) {
       errores.push({'textoError':'Agrega un Nombre al Proyecto'})
   }

   //Si hay errores
   if(errores.length > 0) {
       res.render('nuevoProyecto',{
           nombrePagina: 'Nuevo Proyecto',
           errores,
           proyectos
       })
   } else {
       //No hay errores
       //Insertar una Basas de datos

       
       const proyecto = await Proyectos.create({ nombre });
       res.redirect('/');
   }
}

exports.proyectoPorUrl = async (req, res, next) => {
    //TODO mostrar en el vista de la bd, y como consulto para temas de performance
    const proyectos = await Proyectos.findAll();
    //TODO La consulta seria algo similar a SELECT * FROM proyectos WHERE id = 20
    const proyecto = await Proyectos.findOne({
        where: {
            url : req.params.url
        }
    });

    if(!proyecto) return next();
    //render a la vista
    res.render('tarea', {
        nombrePagina : 'Tarea del Proyecto',
        proyecto,
        proyectos
    })

}
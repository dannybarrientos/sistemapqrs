const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

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

   //TODO Validar que tengamos algo en el imput de Forma manual
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


       await Proyectos.create({ nombre });
       res.redirect('/');
   }
}

exports.proyectoPorUrl = async (req, res, next) => {
    //TODO mostrar en el vista de la bd, y como consulto para temas de performance
    const proyectosPromise =  Proyectos.findAll();
    //TODO La consulta seria algo similar a SELECT * FROM proyectos WHERE id = 20
    const proyectoPromise =  Proyectos.findOne({
        where: {
            url : req.params.url
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    //TODO Consultar Tareas del proyecto Actual
    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        },
        // include : [
        //     { model: Proyectos} //TODO Esta parte es como si fuera un JOIN ya que esto se hacerautomatico que hace Sequilice
        // ]
    });
    console.log(tareas);

    if(!proyecto) return next();
    //render a la vista
    res.render('tarea', {
        nombrePagina : 'Tarea del Proyecto',
        proyecto,
        proyectos,
        tareas
    })

}

exports.formularioEditar = async(req, res) => {
    //TODO mostrar en el vista de la bd, y como consulto para temas de performance
    const proyectosPromise =  Proyectos.findAll();

    const proyectoPromise =  Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);




    //Render a la vista
    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyectos',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async(req, res) =>{
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
      //TODO UPDATE proyectos SETnombre='Nombre Proyecto' WHERE id = 20;
      await Proyectos.update(
          { nombre: nombre },
          { where: { id: req.params.id }}
          );
      res.redirect('/');
  }
}

exports.eliminarProyecto = async (req, res, next) => {
    //req query o parmas obtiene el resultado
    // console.log(req.query);
    const {urlProyecto} = req.query;
    //TODO DELETE en MYSQL seria DELETE FROM '' WHERE id = 20
    const resultado = await Proyectos.destroy({where :{ url: urlProyecto}});
    if(!resultado){
        return next();
    }
    res.status(200).send('Proyecto Eliminado Correctamente')
}
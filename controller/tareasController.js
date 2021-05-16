const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas')

exports.agregarTarea = async(req, res, next) => {

    //TODO Obtenemos el Proyecto Actual
    const proyecto = await Proyectos.findOne({where: { url: req.params.url }});//Es lo mismo que SELECT * FROM proyectos Where Id =20  LIMIT 1

    //TODO Leer el valor del input
    const { tarea } = req.body;
    //TODO estado 0 = Incompleto y ID de Proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    //Insetar en la base de datos
    const resultado = await Tareas.create({tarea, estado, proyectoId})

    if(!resultado){
        return next();
    }

    //TODO Redireccionar
    res.redirect(`/proyectos/${req.params.url}`)

}

exports.cambiarEstadoTarea = async (req, res) => {
    const { id } = req.params;
    //TODO Object literal implemetaremos por ser unico ({where: { id : id }}
    const tarea = await Tareas.findOne({where: { id }});

    // cambiar el estado
    let estado = 0;
    if(tarea.estado === estado) {
        estado = 1;
    }
    tarea.estado = estado;

    const resultado = await tarea.save();
    console.log('datos--',resultado);

    if(!resultado) return next();

    res.status(200).send('Actualizado');
}
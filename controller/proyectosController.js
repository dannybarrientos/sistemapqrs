const Proyectos = require('../models/Proyectos');

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
   //console.log(req.body);

   //Validar que tengamos algo en el imput
   const { nombre } = req.body;

   let errores = [];
   
   if(!nombre) {
       errores.push({'textoError':'Agrega un Nombre al Proyecto'})
   }

   //Si hay errores
   if(errores.length>0) {
       res.render('nuevoProyecto',{
           nombrePagina: 'Nuevo Proyecto',
           errores
       })
   } else {
       //No hay errores
       //Insertar una Basas de datis
       Proyectos.create({ nombre })
       .then(()=> console.log('Insertado Correctamente'))
       .catch(error => console.log(error))
   }
}
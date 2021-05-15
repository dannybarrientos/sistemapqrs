const express = require('express');
const { render } = require('pug');
const router = express.Router();

//TODO Importar Exxpress Validor
const { body } = require('express-validator/check')

//TODO Importar el controllador
const proyectoController = require
        ('../controller/proyectosController');

module.exports = function() {
        //ruta para el hombe
        router.get('/', proyectoController.proyectoHome)
        router.get('/nuevo-proyecto', proyectoController.formularioProyecto)
        router.post('/nuevo-proyecto',
                body('nombre').not().isEmpty().trim().escape(),
                proyectoController.nuevoProyecto
        );

        //TODO Listar Proyectos
        router.get('/proyectos/:url', proyectoController.proyectoPorUrl);

        //TODO Actualizar el Proyecto
        router.get('/proyecto/editar/:id', proyectoController.formularioEditar)
        router.post('/nuevo-proyecto/:id',
                body('nombre').not().isEmpty().trim().escape(),
                proyectoController.actualizarProyecto
        );

        //TODO Eliminar Proyecto
        router.delete('/proyectos/:url', proyectoController.eliminarProyecto );

        return router;
}



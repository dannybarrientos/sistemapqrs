const express = require('express');
const { render } = require('pug');
const router = express.Router();

//TODO Importar el controllador
const proyectoController = require
        ('../controller/proyectosController');

module.exports = function() {
        //ruta para el hombe
        router.get('/', proyectoController.proyectoHome)
        router.get('/nuevo-proyecto', proyectoController.formularioProyecto)
        router.post('/nuevo-proyecto', proyectoController.nuevoProyecto)
        return router;
}



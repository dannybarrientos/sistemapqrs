const express = require('express');
const router = express.Router();

//TODO Importar el controllador
const proyectoController = require
        ('../controller/proyectosController');

module.exports = function() {
        //ruta para el hombe
        router.get('/', proyectoController.proyectoHome);
        router.get('/nosotros',proyectoController.nosotros);
    return router;
}



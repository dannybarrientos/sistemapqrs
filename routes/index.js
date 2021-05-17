const express = require('express');
const { render } = require('pug');
const router = express.Router();

//TODO Importar Exxpress Validor
const { body } = require('express-validator/check')

//TODO Importar el controllador
const proyectoController = require('../controller/proyectosController');

const tareasController = require('../controller/tareasController')
const usuariosController = require('../controller/usuariosController')
const authController = require('../controller/authController')

module.exports = function() {
        //ruta para el Home
        router.get('/',
                authController.usuarioAutenticado,
                proyectoController.proyectoHome
        );

        router.get('/nuevo-proyecto',
                authController.usuarioAutenticado,
                proyectoController.formularioProyecto

        );
        router.post('/nuevo-proyecto',
                authController.usuarioAutenticado,
                body('nombre').not().isEmpty().trim().escape(),
                proyectoController.nuevoProyecto
        );

        //TODO Listar Proyectos
        router.get('/proyectos/:url',
                authController.usuarioAutenticado,
                 proyectoController.proyectoPorUrl
        );

        //TODO Actualizar el Proyecto
        router.get('/proyecto/editar/:id',
                authController.usuarioAutenticado,
                proyectoController.formularioEditar
        );

        router.post('/nuevo-proyecto/:id',
                authController.usuarioAutenticado,
                body('nombre').not().isEmpty().trim().escape(),
                proyectoController.actualizarProyecto
        );

        //TODO Eliminar Proyecto
        router.delete('/proyectos/:url',
                authController.usuarioAutenticado,
                proyectoController.eliminarProyecto
        );

        //TODO Tareas
        router.post('/proyectos/:url',
                authController.usuarioAutenticado,
                tareasController.agregarTarea
        );

        //TODO Actualizar Tarea  //Patch cambian un parte //Update cambia todo
        router.patch('/tareas/:id',
                authController.usuarioAutenticado,
                tareasController.cambiarEstadoTarea
        );

        //TODO Eliminar Tarea
        router.delete('/tareas/:id',
                authController.usuarioAutenticado,
                tareasController.eliminarTarea
        );

        //TODO Crear una Cuenta
        router.get('/crear-cuenta', usuariosController.formCrearCuenta);
        router.post('/crear-cuenta', usuariosController.crearCuenta);

        //TODO Iniciar Session
        router.get('/iniciar-sesion', usuariosController.formIniciarSession)
        router.post('/iniciar-sesion',authController.autenticarUsuario);

        //TODO Cerrar Session
        router.get('/cerrar-sesion', authController.cerrarSesion);

        //TODO Restablecer contraseña
        router.get('/restablecer', usuariosController.formRestablecerPassword);
        router.post('/restablecer', authController.enviarToken);
        router.get('/restablecer/:token', authController.validarToken);
        router.post('/restablecer/:token', authController.actualizarPassword)

        return router;
}



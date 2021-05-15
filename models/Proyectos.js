const Sequelize = require('sequelize')
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');

const Proyectos = db.define('proyectos', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    nombre :  Sequelize.STRING,
    url : Sequelize.STRING
}, { 
    //TODO Validar Datos antes de ingresar a la bases de datos
    hooks : {
          beforeCreate( proyecto ){
                
               const url = slug(proyecto.nombre).toLowerCase() ;


                proyecto.url = `${url}-${shortid.generate()}`;
        }
    },

});

module.exports = Proyectos ;
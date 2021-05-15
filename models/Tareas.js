const Sequelize = require('sequelize')
const db = require('../config/db');
const Proyectos = require('./Proyectos');

const Tareas = db.define('tareas', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    tarea: Sequelize.STRING(100),
    estado:Sequelize.INTEGER(1)
});

//TODO Relacion las tablas, Cada Tarea Pertenece a un Proyecto y me crea la llave foranea
Tareas.belongsTo(Proyectos)
// Un Proyeto puede tener muchas tareas  Proyectos.hasMany(Tareas) y esto tendria que ir el modelo de Proyectos
module.exports = Tareas
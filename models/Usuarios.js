const Sequelize = require('sequelize')
const db = require('../config/db');
const Proyectos = require('../models/Proyectos')
const bcrypt =require('bcrypt-nodejs')

const Usuarios = db.define('usuarios', {
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type:Sequelize.STRING(60),
        allowNull: false,

    },
    password: {
        type:Sequelize.STRING(60),
        allowNull:false,

    }
},{
    hooks: {
        beforeCreate(usuario) {
            usuario.password =bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10))
        }
    }
}
);

//TODO Un usuario puede tener muchos proyectos
Usuarios.hasMany(Proyectos)

module.exports = Usuarios;

const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Users = db.define('Users',{

    name:{
        type: DataTypes.STRING,
        require: true,
    },

    senha:{
        type: DataTypes.STRING,
        require: true,
    },

    email:{
        type: DataTypes.STRING,
        require: true,
    },

    telefone:{
        type: DataTypes.STRING,
        require: true,
    },

    tipo:{
        type: DataTypes.STRING,
        require: true,
    },
});

module.exports = Users
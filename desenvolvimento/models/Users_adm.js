const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Users_adm = db.define('Users_adm',{

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
    }
});

module.exports = Users_adm
const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Cursos = db.define('Cursos',{

    nome:{
        type: DataTypes.STRING,
        require: true,
        unique: true,
    },

    qtde_semestre:{
        type: DataTypes.INTEGER,
        require: true,
    },
},{
    timestamps: false // Desativa `createdAt` e `updatedAt`
});


module.exports = Cursos;
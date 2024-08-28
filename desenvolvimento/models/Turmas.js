const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Turmas = db.define('Turmas',{

    cod_turma:{
        type: DataTypes.STRING,
        require: true,
    },
    ano:{
        type: DataTypes.INTEGER,
        require: true,
    },
    semestre:{
        type: DataTypes.INTEGER,
        require: true,
    },
},{
    timestamps: false // Desativa `createdAt` e `updatedAt`
});

module.exports = Turmas;
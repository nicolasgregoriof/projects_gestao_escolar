const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Turmas = db.define('Turmas',{

    cod_curso:{
        type: DataTypes.INTEGER,
        require: true,
    },
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
    timestamps: false, // Desativa `createdAt` e `updatedAt`
    indexes: [
        {
            unique: true,
            fields: ['cod_curso','cod_turma', 'ano', 'semestre'], // Conjunto único de campos
        },
    ],
});

module.exports = Turmas;
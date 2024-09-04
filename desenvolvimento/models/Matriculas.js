const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Alunos = require('./Alunos'); 
const Turmas_disc_professores = require('./Turmas_disc_professores'); 

const Matriculas = db.define('Matriculas',{

        mat_aluno:{
            type: DataTypes.STRING,
            require: true,
        },
        
        mat_ano:{
            type: DataTypes.INTEGER,
            require: true,
        },

        mat_curso:{
            type: DataTypes.STRING,
            require: true,
        },

        mat_disciplina:{
            type: DataTypes.STRING,
            require: true,
        },

        mat_sufturma:{
            type: DataTypes.STRING,
            require: true,
        },
    },

);

module.exports = Matriculas;
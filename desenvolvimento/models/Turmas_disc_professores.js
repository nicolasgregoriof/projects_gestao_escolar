const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Turmas = require('./Turmas'); 
const Disciplinas_professores = require('./Disciplinas_professores'); 


const Turmas_disc_professores = db.define('Turmas_disc_professores',{

    t_curso:{
        type: DataTypes.STRING,
        require: true,
    },

    t_disciplina:{
        type: DataTypes.STRING,
        require: true,
    },

    t_professor:{
        type: DataTypes.STRING,
        require: true,
    },

    t_ano:{
        type: DataTypes.INTEGER,
        require: true,
    },

    t_semestre:{
        type: DataTypes.INTEGER,
        require: true,
    },
    
    t_sufixo:{
        type: DataTypes.STRING,
        require: true,
    },
    
},{
    timestamps: false 
});

module.exports = Turmas_disc_professores;
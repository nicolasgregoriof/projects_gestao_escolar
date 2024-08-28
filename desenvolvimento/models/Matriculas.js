const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Alunos = require('./Alunos'); 
const Turmas_disc_professores = require('./Turmas_disc_professores'); 

const Matriculas = db.define('Matriculas',{

    id_aluno:{
        type: DataTypes.INTEGER,
        require: true,
        references: {
            model: Alunos, 
            key: 'id', 
        }
    },
    
    id_turmas_disc_professores:{
        type: DataTypes.INTEGER,
        require: true,
        references: {
            model: Turmas_disc_professores, 
            key: 'id', 
        }
    },

    data_matricula:{
        type: DataTypes.DATE,
        require: true,
    },
},

{
    timestamps: false // Desativa `createdAt` e `updatedAt`
});

// Define a associação entre Disciplinas_prefessores e Disciplinas
Alunos.hasMany(Matriculas, { foreignKey: 'id_aluno' });
Matriculas.belongsTo(Alunos, { foreignKey: 'id_aluno' });

// Define a associação entre Disciplinas_prefessores e Professores
Turmas_disc_professores.hasMany(Matriculas, { foreignKey: 'id_turmas_disc_professores' });
Matriculas.belongsTo(Turmas_disc_professores, { foreignKey: 'id_turmas_disc_professores' });


module.exports = Matriculas;
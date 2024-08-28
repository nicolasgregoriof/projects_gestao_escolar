const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Turmas = require('./Turmas'); 
const Disciplinas_professores = require('./Disciplinas_professores'); 


const Turmas_disc_professores = db.define('Turmas_disc_professores',{

    id_turma:{
        type: DataTypes.INTEGER,
        require: true,
        references: {
            model: Turmas, 
            key: 'id', 
        }
    },
    
    id_disciplina_professor:{
        type: DataTypes.INTEGER,
        require: true,
        references: {
            model: Disciplinas_professores, 
            key: 'id', 
        }
    },


},{
    timestamps: false // Desativa `createdAt` e `updatedAt`
});

// Define a associação entre Disciplinas_prefessores e Disciplinas
Turmas.hasMany(Turmas_disc_professores, { foreignKey: 'id_turma' });
Turmas_disc_professores.belongsTo(Turmas, { foreignKey: 'id_turma' });

// Define a associação entre Disciplinas_prefessores e Professores
Disciplinas_professores.hasMany(Turmas_disc_professores, { foreignKey: 'id_disciplina_professor' });
Turmas_disc_professores.belongsTo(Disciplinas_professores, { foreignKey: 'id_disciplina_professor' });


module.exports = Turmas_disc_professores;
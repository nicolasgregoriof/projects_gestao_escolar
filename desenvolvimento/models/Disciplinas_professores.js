const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Disciplinas = require('./Disciplinas'); 
const Professores = require('./Professores'); 

const Disciplinas_professores = db.define('Disciplinas_professores',{

    id_disciplina:{
        type: DataTypes.INTEGER,
        require: true,
        references: {
            model: Disciplinas, 
            key: 'id', 
        }
    },
    
    id_professor:{
        type: DataTypes.INTEGER,
        require: true,
        references: {
            model: Professores, 
            key: 'id', 
        }
    },
    

},{
    timestamps: false // Desativa `createdAt` e `updatedAt`
});

// Define a associação entre Disciplinas_prefessores e Disciplinas
Disciplinas.hasMany(Disciplinas_professores, { foreignKey: 'id_disciplina' });
Disciplinas_professores.belongsTo(Disciplinas, { foreignKey: 'id_disciplina' });

// Define a associação entre Disciplinas_prefessores e Professores
Professores.hasMany(Disciplinas_professores, { foreignKey: 'id_professor' });
Disciplinas_professores.belongsTo(Professores, { foreignKey: 'id_professor' });


module.exports = Disciplinas_professores;
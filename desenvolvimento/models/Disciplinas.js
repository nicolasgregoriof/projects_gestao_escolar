const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Cursos = require('./Cursos'); // Importa o model Cursos

const Disciplinas = db.define('Disciplinas',{

    nome:{
        type: DataTypes.STRING,
        require: true,
    },

    semestre:{
        type: DataTypes.INTEGER,
        require: true,
    },

    id_curso:{
        type: DataTypes.INTEGER,
        require: true,
        references: {
            model: Cursos, // Refere-se ao model Curso
            key: 'id',    // Refere-se à chave primária do model Curso
        }
    },

    nome_curso:{
        type: DataTypes.STRING,
        require: false,
    },

},{
    timestamps: false // Desativa `createdAt` e `updatedAt`
});

// Define a associação entre Disciplinas e Curso
Cursos.hasMany(Disciplinas, { foreignKey: 'id_curso' });
Disciplinas.belongsTo(Cursos, { foreignKey: 'id_curso' });


module.exports = Disciplinas;
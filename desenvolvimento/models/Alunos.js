const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Users = require('./Users'); 

const Alunos = db.define('Alunos',{

    id_user:{
        type: DataTypes.INTEGER,
        require: true,
        references: {
            model: Users, // Refere-se ao model Users
            key: 'id',    // Refere-se à chave primária do model Users
        }
    },

    nome_user:{
        type: DataTypes.STRING,
        require: true,
    },
},{
    timestamps: false // Desativa `createdAt` e `updatedAt`
});

// Define a associação entre Alunos e Users
Users.hasMany(Alunos, { foreignKey: 'id_user' });
Alunos.belongsTo(Users, { foreignKey: 'id_user' });

module.exports = Alunos;
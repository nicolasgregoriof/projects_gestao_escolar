const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Users = require('./Users'); 

const Professores = db.define('Professores',{

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

// Define a associação entre Professores e Users
Users.hasMany(Professores, { foreignKey: 'id_user' });
Professores.belongsTo(Users, { foreignKey: 'id_user' });


module.exports = Professores;
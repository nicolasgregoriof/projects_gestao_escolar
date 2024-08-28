const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('admschool','root','admin',{
    host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true, // Desativa a pluralização automática
    },
})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso!')
} catch(err){
    console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize
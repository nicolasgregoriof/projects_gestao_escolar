const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('admschool','ng_figueiredo','admin',{
    host: '10.0.0.128',
    dialect: 'mysql',
    define: {
        freezeTableName: true, // Desativa a pluralização automática
    },
})

/*const sequelize = new Sequelize('admschool','admin','admin1234',{
    host: 'admschool.cj1hbdrfyshz.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    define: {
        freezeTableName: true, // Desativa a pluralização automática
    },
})*/

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso!')
} catch(err){
    console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize
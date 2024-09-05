const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('admschool','ng_figueiredo','admin',{
    host: '0.tcp.sa.ngrok.io',
    port: 12397,
    dialect: 'mysql',
    define: {
        freezeTableName: true, // Desativa a pluralização automática
    },
    pool: {
        acquire: 30000, // Tempo limite para adquirir uma conexão
    },
    dialectOptions: {
        connectTimeout: 10000 // Tempo limite de conexão
    }
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
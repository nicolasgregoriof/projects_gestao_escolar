require('dotenv').config();
const { Sequelize } = require('sequelize')

// Acessa as variáveis de ambiente
const dbName = process.env.DB_DBNAME;
const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort, // Porta do banco de dados
    dialect: 'mysql',
    define: {
        freezeTableName: true, // Desativa a pluralização automática
    },
    logging: console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, // Tempo limite para adquirir uma conexão
        idle: 10000 // Tempo limite para conexão ociosa
    },
    dialectOptions: {
        connectTimeout: 60000 // Tempo limite de conexão
    }
});

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
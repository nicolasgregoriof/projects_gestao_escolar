require('dotenv').config();
const { Sequelize } = require('sequelize');


// Configuração do Sequelize
const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: process.env.PORT,
        dialect: 'mysql',
        define: {
        freezeTableName: true, // Desativa a pluralização automática
    },
});

// Função para verificar a conexão com o banco de dados
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conectamos com sucesso!');
    } catch (err) {
        console.error(`Não foi possível conectar: ${err}`);
    }
}


module.exports = sequelize;

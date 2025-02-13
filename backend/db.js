const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('BrainBox_db', 'postgres', 'admin123', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
});

async function Conn() {
    try {
        await sequelize.authenticate();
        console.log('Database connection successful...');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

Conn();

module.exports = sequelize;

const sequelize = require('../config/database')

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connected to database');

        await sequelize.sync({alert:true});
        console.log("Database schema synchronized");
                
    } catch (error) {
        console.log('Error initializing database:', error);
        
    }
}

module.exports = initializeDatabase;
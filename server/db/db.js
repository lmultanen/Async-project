const Sequelize = require('sequelize');

const config = {
    dialect: 'postgres',
    logging: false,
  }

if (process.env.DATABASE_URL) {
    config.dialectOptions = {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
}

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/games', config);


module.exports = db;
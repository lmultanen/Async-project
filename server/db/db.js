const Sequelize = require('sequelize');

const config = {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/games', { logging: false }, config);

module.exports = db;
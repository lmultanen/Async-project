const db = require('./db');
const Sequelize = require('sequelize');

const Console = db.define('console', {
    name: {
        type: Sequelize.STRING
    },
    slug: {
        type: Sequelize.STRING
    },
    imageUrl: {
        type: Sequelize.STRING
    }
})

module.exports = Console;
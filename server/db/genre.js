const db = require('./db');
const Sequelize = require('sequelize');

const Genre = db.define('genre', {
    name: {
        type: Sequelize.STRING,
    },
    slug: {
        type: Sequelize.STRING
    },
    imageUrl: {
        type: Sequelize.STRING
    }
})

// can pull genres from api
module.exports = Genre;
const db = require('./db')
const Sequelize = require('sequelize')

const Game = db.define('game', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    slug: {
        type: Sequelize.STRING
    },
    releaseDate: {
        type: Sequelize.DATE
    },
    urlImage: {
        type: Sequelize.STRING
    },
    user_rating: {
        type: Sequelize.FLOAT
    },
    metacritic_rating: {
        type: Sequelize.INTEGER
    },
    platforms: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    // tags: {
    //     type: Sequelize.ARRAY
    // }
    esrb_rating: {
        type: Sequelize.STRING
    }
})

module.exports = Game
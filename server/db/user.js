const db = require('./db')
const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Game = require('./game')

const diff = 10;
const jwtStr = 'async-project'

const User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.STRING
    }

})

User.byToken = async(token) => {
    try {
        jwt.verify(token,jwtStr);
        const user = await User.findByPk(jwt.decode(token).userId, {
            include: {
                model: Game
            }
        })
        if (user) {
            return user;
        }
        const error = Error('bad credentials');
        error.status = 401;
        throw error;
    } catch (err) {
        const error = Error('bad credentials');
        error.status = 401;
        throw error;
    }
}

User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password,diff)
    user.password = hashedPassword;
})

User.authenticate = async({ username, password }) => {
    const user = await User.findOne({
        where: {
            username
        }
    });
    if (user && await bcrypt.compare(password, user.password)) {
        var temp = jwt.sign({userId: user.id},jwtStr)
        return temp;
    }
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
}

module.exports = User;
const { User, Game } = require('../db');
const router = require('express').Router();

router.get('/', async (req,res,next) => {
    try {
        const users = await User.findAll();
        const usernames = [];
        users.forEach(user => usernames.push(user.username.toLowerCase()))
        res.send(usernames)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req,res,next) => {
    try {
        const user = await User.create(req.body)
        res.send(user)
    } catch (err) {
        next(err)
    }
})


// test route for seeing how user including games
router.get('/:id', async (req,res,next) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: {
                model: Game
            }
        })
        res.send(user)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req,res,next) => {
    try {
        const user = await User.findByPk(req.params.id);
        const game = await Game.findByPk(req.body.game.id);
        // screwed up associations a bit probably, but it's working
        if (req.body.method === 'add') {
            await game.addFavoritedGame(user);
        } else {
            await game.removeFavoritedGame(user)
        }
        const updatedUser = await User.findByPk(req.params.id, {
            include: {
                model: Game
            }
        })
        res.send(updatedUser)
    } catch (err) {
        next(err)
    }
})

module.exports = router
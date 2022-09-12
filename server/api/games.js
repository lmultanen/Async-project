const { Game, Genre } = require('../db');

const router = require('express').Router();

router.get('/', async(req,res,next) => {
    try {
        const games = await Game.findAll({
            order: [["name", "asc"]],
            include: {
                model: Genre
            }
        })
        res.send(games)
    } catch (err) {
        next(err)
    }
})

router.get('/:slug', async (req,res,next) => {
    try {
        const game = await Game.findOne({
            where: {
                slug: req.params.slug
            }, 
            include: {
                model: Genre
            }
        })
        res.send(game)
    } catch (err) {
        next(err)
    }
})




module.exports = router;
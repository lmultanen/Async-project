const { Game, Genre } = require('../db');

const router = require('express').Router();

router.get('/', async(req,res,next) => {
    try {
        const genres = await Genre.findAll({
            include: {
                model: Game
            }
        })
        res.send(genres)
    } catch (err) {
        next(err)
    }
})

router.get('/:slug', async (req,res,next) => {
    try {
        const genre = await Genre.findOne({
            where: {
                slug: req.params.slug
            }, 
            include: {
                model: Game
            }
        })
        res.send(genre)
    } catch (err) {
        next(err)
    }
})




module.exports = router;
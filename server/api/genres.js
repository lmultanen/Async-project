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




module.exports = router;
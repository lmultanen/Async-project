const { Game, Genre } = require('../db');

const router = require('express').Router();

router.get('/', async(req,res,next) => {
    try {
        const games = await Game.findAll({
            include: {
                model: Genre
            }
        })
        res.send(games)
    } catch (err) {
        next(err)
    }
})




module.exports = router;
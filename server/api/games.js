const { Game, Genre, Console } = require('../db');

const router = require('express').Router();

router.get('/', async(req,res,next) => {
    try {
        // console.log(req.query.page)
        // console.log(req.query)
        if (req.query.page) {
            // hardcoding number of results for now; could make dynamic later
            let num = 20;
            const games = await Game.findAll({
                order: [["name","asc"]],
                // might not even need to include these models in query
                include: [{model: Genre}, {model: Console}],
                offset: (req.query.page-1)*num,
                limit: num
            })
            // console.log(req.query.page)
            // console.log(games)
            res.send(games)
        } else {
            const games = await Game.findAll({
                order: [["name", "asc"]],
                include: [{model: Genre},{model: Console}]
            })
            res.send(games)
        }
    } catch (err) {
        next(err)
    }
})

router.get('/')

router.get('/:slug', async (req,res,next) => {
    try {
        const game = await Game.findOne({
            where: {
                slug: req.params.slug
            }, 
            include: [{model: Genre},{model: Console}]
        })
        res.send(game)
    } catch (err) {
        next(err)
    }
})




module.exports = router;
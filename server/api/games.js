const { Op } = require('sequelize');
const { Game, Genre, Console } = require('../db');

const router = require('express').Router();

router.get('/', async(req,res,next) => {
    try {
        // console.log(req.query)
        let filterString = req.query.search ? req.query.search.toLowerCase() : '';
        if (req.query.page) {
            // hardcoding number of results for now; could make dynamic later
            let num = 20;
            const games = await Game.findAll({
                order: [["name","asc"]],
                where: {slug: {[Op.like]: `%${filterString}%`}},
                include: [{model: Genre}, {model: Console}],
                offset: (req.query.page-1)*num,
                limit: num
            })
            res.send(games)
        } else if (req.query.console && req.query.genre) {
            const games = await Game.findAll({
                include: [{
                    model: Genre,
                    where: {name: req.query.genre}
                }, {
                    model: Console,
                    where: {name: req.query.console}
                }]
            })
            console.log(`Total ${req.query.genre} games on ${req.query.console}: ${games.length}`)
            res.send(games)
        } else {
            const games = await Game.findAll({
                order: [["name", "asc"]],
                where: {slug: {[Op.like]: `%${filterString}%`}},
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
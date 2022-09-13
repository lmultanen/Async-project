const { Console, Game } = require('../db');

const router = require('express').Router();

router.get('/', async(req,res,next) => {
    try {
        const consoles = await Console.findAll({
            order: [["name", "asc"]],
            include: {model: Game}
        });
        res.send(consoles)
    } catch (err) {
        next(err)
    }
})

router.get('/:slug', async (req,res,next) => {
    try {
        const console = await Console.findOne({
            where: {
                slug: req.params.slug
            },
            include: {model: Game}
        })
        res.send(console);
    } catch (err) {
        next(err)
    }
})

module.exports = router;
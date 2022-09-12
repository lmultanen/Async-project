const router = require('express').Router();
const gamesRouter = require('./games');
const genresRouter = require('./genres')

router.use('/games', gamesRouter);
router.use('/genres', genresRouter);

module.exports = router;
const router = require('express').Router();
const gamesRouter = require('./games');
const genresRouter = require('./genres');
const consolesRouter = require('./consoles');

router.use('/games', gamesRouter);
router.use('/genres', genresRouter);
router.use('/consoles', consolesRouter);

module.exports = router;
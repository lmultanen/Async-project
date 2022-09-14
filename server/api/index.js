const router = require('express').Router();
const gamesRouter = require('./games');
const genresRouter = require('./genres');
const consolesRouter = require('./consoles');
const authRouter = require('./auth');
const usersRouter = require('./users')

router.use('/games', gamesRouter);
router.use('/genres', genresRouter);
router.use('/consoles', consolesRouter);
router.use('/auth', authRouter)
router.use('/users', usersRouter)

module.exports = router;
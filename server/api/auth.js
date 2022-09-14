const { User } = require('../db');
const router = require('express').Router();

router.post('/', async (req,res,next) => {
    try {
        const token = await User.authenticate(req.body)
        res.send(token)
    } catch (err) {
        next(err)
    }
});

router.get('/', async (req,res,next) => {
    try {
        // if adding comments later, will want to include that model here
        const user = await User.byToken(req.headers.authorization)
        res.send(user)
    } catch (err) {
        next(err)
    }
})

module.exports = router;
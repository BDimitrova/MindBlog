const router = require('express').Router();
const blogServices = require('../services/blogServices');

router.get('/', async (req, res) => {
    let getTop = await blogServices.getTopThree().lean();
    res.render('home', { getTop });
});

module.exports = router
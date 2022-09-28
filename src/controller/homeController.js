const router = require('express').Router();
const blogServices = require('../services/blogServices');
const { isAuth } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
    let getTop = await blogServices.getTopThree().lean();
    res.render('home', { getTop });
});

router.use('/profile',isAuth, async (req, res) => {
    const userId = req.user._id;
    let followed = await blogServices.getMyFollowBlog(userId);
    let created = await blogServices.getMyCreatedBlog(userId);

    res.render('profile', {followed, created});
});

module.exports = router
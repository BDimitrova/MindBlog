const router = require('express').Router();

const homeController = require('./controller/homeController');
const authController = require('./controller/authController');
const blogController = require('./controller/blogController');

router.use(homeController);
router.use('/auth', authController);
router.use('/blog', blogController);
router.use('/*', (req, res) => {
    res.render('404');
})

module.exports = router;
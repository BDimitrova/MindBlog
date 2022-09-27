const router = require('express').Router();

const blogServices = require('../services/blogServices');
const { isAuth } = require('../middleware/authMiddleware');

router.get('/catalog', async (req, res) => {
    let blog = await blogServices.getAll();
    res.render('blogs/catalog', { blog });
});

router.get('/create-blog', (req, res) => {
    res.render('blogs/create');
})

module.exports = router;
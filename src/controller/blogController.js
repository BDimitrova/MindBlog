const router = require('express').Router();

router.get('/catalog', (req, res) => {
    res.render('blogs/catalog');
});


module.exports = router;
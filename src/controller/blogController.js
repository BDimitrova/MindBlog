const router = require('express').Router();

const blogServices = require('../services/blogServices');
const { isAuth } = require('../middleware/authMiddleware');

async function isOwner(req, res, next) {
    let blog = await blogServices.getOne(req.params.blogId);

    if (blog.owner == req.user._id) {
        res.redirect(`/books/${req.params.blogId}/details`);
    } else {
        next();
    }
}

async function checkIsOwner(req, res, next) {
    let blog = await blogServices.getOne(req.params.blogId);

    if (blog.owner == req.user._id) {
        next();
    } else {
        res.redirect(`/books/${req.params.blogId}/details`);
    }
}

router.get('/catalog', async (req, res) => {
    let blog = await blogServices.getAll();
    res.render('blogs/catalog', { blog });
});

router.get('/create-blog', isAuth, async (req, res) => {
    res.render('blogs/create');
})

router.post('/create-blog', isAuth, async (req, res) => {
    console.log(req.user);
    try {
        await blogServices.create({ ...req.body, owner: req.user });
        res.redirect('/blog/catalog');
    } catch (error) {
        res.render('blogs/create', { error: getErrorMessage(error)})
    }

});

function getErrorMessage(error) {
    let errorsArr = Object.keys(error.errors);

    if (errorsArr.length > 0) {
        return error.errors[errorsArr[0]];
    } else {
        return error.message
    }

}

router.get('/:blogId/details', async (req, res) => {
    let blog = await blogServices.getOne(req.params.blogId);

    let blogData = blog.toObject();

    let isOwner = blogData.owner == req.user?._id;

    let blogOwner = await blogServices.findOwner(blog.owner).lean();

    let follow = blog.getFollow();
    let followersCount = blog.getUsername();

    let isFollowed = req.user && follow.some(c => c._id == req.user?._id);

    res.render('blogs/details', { ...blogData, isOwner, isFollowed, followersCount, blogOwner });
});

router.get('/:blogId/follow', async (req, res) => {
    const blogId = req.params.blogId
    let blog = await blogServices.getOne(blogId);

    blog.followList.push(req.user._id);
    await blog.save();
    res.redirect(`/blog/${req.params.blogId}/details`);
});

router.get('/:blogId/edit', checkIsOwner, async (req, res) => {
    const blogId = req.params.blogId
    let blog = await blogServices.getOne(blogId);
    res.render('blogs/edit', { ...blog.toObject() })
});

router.post('/:blogId/edit', checkIsOwner, async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blogData = req.body;
        await blogServices.update(blogId, blogData);
        res.redirect(`/blog/${blogId}/details`);
    } catch (error) {
        res.render('blogs/edit', { error: getErrorMessage(error)})
    }

});

router.get('/:blogId/delete', checkIsOwner, async (req, res) => {
    const blogId = req.params.blogId;
    await blogServices.delete(blogId);
    res.redirect('/blog/catalog');
})

module.exports = router;
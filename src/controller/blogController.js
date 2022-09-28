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

router.get('/create-blog', async (req, res) => {
    res.render('blogs/create');
})

router.post('/create-blog', async (req, res) => {
    console.log(req.user);
    try {
        await blogServices.create({ ...req.body, owner: req.user });
        res.redirect('/blog/catalog');
    } catch (error) {
        res.render('blogs/create', error)
    }

});

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

router.get('/:blogId/edit', async (req, res) => {
    const blogId = req.params.blogId
    let blog = await blogServices.getOne(blogId);
    res.render('blogs/edit', { ...blog.toObject() })
});

router.post('/:blogId/edit', async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blogData = req.body;
        await blogServices.update(blogId, blogData);
        res.redirect(`/blog/${blogId}/details`);
    } catch (error) {
        res.render('blogs/edit')
    }

});

router.get('/:blogId/delete', async (req, res) => {
    const blogId = req.params.blogId;
    await blogServices.delete(blogId);
    res.redirect('/blog/catalog');
})

module.exports = router;
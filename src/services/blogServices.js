const Blog = require('../models/Blog');

exports.create = (blogData) => Blog.create(blogData);

exports.getAll = () => Blog.find().lean();

exports.getOne = (blogId) => Blog.findById(blogId).populate('followList');

exports.getMyWishBook = (userId) => Blog.find({ followList: userId}).lean();

exports.update = (blogId, blogData) => Blog.findByIdAndUpdate(blogId, blogData);

exports.delete = (blogId) => Blog.findByIdAndDelete(blogId);
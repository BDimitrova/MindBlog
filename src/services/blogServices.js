const Blog = require('../models/Blog');
const User = require('../models/User');

exports.create = (blogData) => Blog.create(blogData);

exports.getAll = () => Blog.find().lean();

exports.getTopThree = () => Blog.find().sort({createdAt: -1}).limit(3);

exports.findUser = (userId) => User.findById(userId);

exports.findOwner = (userId) => User.findById(userId);

exports.getMyFollowBlog = (userId) => Blog.find({ followList: userId}).lean();

exports.getMyCreatedBlog = (userId) => Blog.find({ owner: userId}).lean();

exports.getOne = (blogId) => Blog.findById(blogId).populate('followList');

exports.delete = (blogId) => Blog.findByIdAndDelete(blogId);

exports.update = (blogId, blogData) => Blog.findByIdAndUpdate(blogId, blogData);

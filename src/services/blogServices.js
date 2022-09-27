const Blog = require('../models/Blog');
const User = require('../models/User');

exports.create = (blogData) => Blog.create(blogData);

exports.getAll = () => Blog.find().lean();

exports.findUser = (userId) => User.findById(userId);

exports.findOwner = (userId) => User.findById(userId);

exports.getOne = (blogId) => Blog.findById(blogId).populate('followList');

exports.getMyFollowBlog = (userId) => Blog.find({ followList: userId}).lean();

exports.update = (blogId, blogData) => Blog.findByIdAndUpdate(blogId, blogData);

exports.delete = (blogId) => Blog.findByIdAndDelete(blogId);
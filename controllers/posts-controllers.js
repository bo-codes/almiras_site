// we created this HttpErr model so that we can easily just pass unique values for the typical JS built in Error class when we throw an error.
// this makes it easy to make custom errors for any given path.
const HttpErr = require("../models/http-err");

// when called this will return an array of all of the errors produced.
const { validationResult } = require("express-validator");

const Post = require("../models/post");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

const getPostById = async (req, res, next) => {
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpErr(
      "Could not find a post with the provided id.",
      500
    );
    return next(error);
  }

  if (!post) {
    // handling our err using next will make our request run through all other middlwares first,-
    // -and then cycle through all errs that we end up with at the end of it once we hit the err handler in our app.js file;
    const err = new HttpErr(`Could not find a post with id ${postId}.`, 404);
    return next(err);
  }

  res.json({ post: post.toObject({ getters: true }) });
};

const getPostsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithPosts;
  try {
    userWithPosts = await User.findById(userId).populate("posts");
  } catch (err) {
    const error = new HttpErr(
      "Was not able to search for user with provided userId",
      500
    );
    return next(error);
  }

  if (!userWithPosts || userWithPosts.length === 0) {
    const error = new HttpErr("No user found with the provided id", 404);
    return next(error);
  }

  res.json({posts: userWithPosts.posts.map(post => post.toObject({getters: true}))})
};

const getAllPosts = async (req, res, next) => {
  const posts = await Post.find();
  res.json(posts.map((post) => post.toObject({ getters: true })));
};

const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpErr("Invalid inputs.", 422));
  }

  const { img, description, creator } = req.body;

  const newPost = new Post({
    img,
    description,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpErr(
      "Search for user by id could not be performed",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpErr("No user found with the provided id", 404);
    return next(error);
  }

  try {
    const sesh = await mongoose.startSession();
    sesh.startTransaction();
    await newPost.save({ session: sesh });
    user.posts.push(newPost);
    await user.save({ session: sesh });
    await sesh.commitTransaction();
  } catch (err) {
    const error = new HttpErr("Failed to save post to db.", 500);
    return next(error);
  }
  res.status(201).json({ post: newPost });
};

const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpErr("Invalid inputs.", 422));
  }

  const { img, description } = req.body;
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpErr(
      "Could not update. Post with provided id does not exist.",
      404
    );
    return next(error);
  }
  post.img = img;
  post.description = description;

  try {
    await post.save();
  } catch (err) {
    const error = new HttpErr("Could not save the updated post to db.", 500);
    return next(error);
  }

  res.status(200).json({ post: post.toObject({ getters: true }) });
};

const deletePost = async (req, res, next) => {
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId).populate("creator");
  } catch (err) {
    const error = new HttpErr("Failed to search for post.", 500);
    return next(error);
  }

  if (!post) {
    const error = new HttpErr("Post with provided id does not exist", 404);
    return next(error);
  }

  try {
    const sesh = await mongoose.startSession();
    sesh.startTransaction();
    await post.deleteOne({ session: sesh });
    post.creator.posts.pull(post);
    await post.creator.save({ session: sesh });
    await sesh.commitTransaction();
  } catch (err) {
    const error = new HttpErr("Failed to delete post from db.", 500);
    return next(error);
  }
  res
    .status(200)
    .json({ message: `successfully deleted post with id ${postId}.` });
};

module.exports = {
  getPostById,
  getPostsByUserId,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};

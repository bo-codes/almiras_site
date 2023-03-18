// we created this HttpErr model so that we can easily just pass unique values for the typical JS built in Error class when we throw an error.
// this makes it easy to make custom errors for any given path.
const HttpErr = require("../models/http-err");

// when called this will return an array of all of the errors produced.
const { validationResult } = require("express-validator");

const Post = require("../models/post");




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

const getAllPosts = async (req, res, next) => {
  const posts = await Post.find();
  res.json(posts.map((post) => post.toObject({ getters: true })));
};

const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpErr("Invalid inputs.", 422));
  }

  const { img, description } = req.body;

  const newPost = new Post({
    img,
    description,
  });

  try {
    await newPost.save();
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
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpErr(
      "Could not delete post. Given post id does not match any post.",
      404
    );
    return next(error);
  }

  try {
    await post.deleteOne();
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
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};

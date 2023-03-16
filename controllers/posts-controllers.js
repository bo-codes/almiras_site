// we created this HttpErr model so that we can easily just pass unique values for the typical JS built in Error class when we throw an error.
// this makes it easy to make custom errors for any given path.
const HttpErr = require("../models/http-err");
const { v4: uuidv4 } = require("uuid");
// when called this will return an array of all of the errors produced.
const { validationResult } = require("express-validator");

let posts = [
  {
    id: "1",
    img: "IMG01",
    description: "This is the image's description",
  },
];

const getPostById = (req, res, next) => {
  const postId = req.params.pid;

  const post = posts.find((post) => {
    return post.id === postId;
  });

  if (!post) {
    // handling our err using next will make our request run through all other middlwares first,-
    // -and then cycle through all errs that we end up with at the end of it once we hit the err handler in our app.js file;
    return next(new HttpErr(`Could not find a post with id ${postId}`, 404));
  }

  console.log("POSTS ROOT PATH");
  res.json({ message: "connection made" });
};

const getAllPosts = (req, res, next) => {
  res.json(posts);
};

const createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpErr("Invalid inputs", 422));
  }

  const { img, description } = req.body;

  const newPost = {
    id: uuidv4(),
    img,
    description,
  };

  posts.push(newPost);
  res.status(201).json({ post: newPost });
};

const updatePost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpErr("Invalid inputs", 422));
  }

  const { img, description } = req.body;
  const postId = req.params.pid;

  const updatedPost = { ...posts.find((post) => post.id === postId) };
  const postIndex = posts.findIndex((post) => post.id === postId);
  updatedPost.img = img;
  updatedPost.description = description;

  posts[postIndex] = updatedPost;

  res.status(200).json({ post: updatedPost, updatedPosts: posts });
};

const deletePost = (req, res, next) => {
  const postId = req.params.pid;
  if (!posts.find((post) => post.id === postId)) {
    return next(new HttpErr("Given post id does not match any post", 404));
  }

  posts = posts.filter((post) => post.id !== postId);

  res
    .status(200)
    .json({ message: `deleted post with id ${postId}`, updatedPosts: posts });
};

module.exports = {
  getPostById,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};

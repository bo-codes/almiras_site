const express = require("express");
const { check } = require("express-validator");

const postsControllers = require("../controllers/posts-controllers");

const router = express.Router();

router.get("/", postsControllers.getAllPosts);

router.get("/:pid", postsControllers.getPostById);

// router.get("/:uid", postsControllers.getPostsByUserId);

router.post(
  "/",
  [check("img").not().isEmpty(), check("description").not().isEmpty()],
  postsControllers.createPost
);

router.patch("/:pid", [check("img").not().isEmpty(), check("description").not().isEmpty()], postsControllers.updatePost);

router.delete("/:pid", postsControllers.deletePost);

module.exports = router;

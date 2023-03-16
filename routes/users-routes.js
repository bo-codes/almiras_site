const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersControllers.getUsers);

router.post(
  "/signup",
  [
    check("username").not().isEmpty(),
    check("password").not().isEmpty(),
    check("name").not().isEmpty(),
  ],
  usersControllers.signup
);

router.post("/login", usersControllers.login);

// router.patch('/:uid')

// router.delete('/:uid')

module.exports = router

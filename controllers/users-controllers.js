const HttpErr = require("../models/http-err");
const { validationResult } = require("express-validator");

// require("dotenv").config();

const User = require("../models/user")

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpErr('User search failed', 500)
    return next(error);
  }
  res.json({users: users.map((user) => user.toObject({ getters: true }))});
};

const signup = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpErr("Invalid Credentials", 422));
  }

  const { name, username, password } = req.body;

  let existingUser
  try {
    existingUser = await User.findOne({username: username});
  } catch (err) {
    const error = new HttpErr("User with this username already exists.", 422);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpErr(
      'User with this username already exists.',
      422
    )
    return next(error);
  }

  const createdUser = new User({
    name,
    username,
    password,
    posts: []
  });

  try {
    await createdUser.save()
  } catch (err) {
    console.log(createdUser.save())
    const error = new HttpErr('Could not save new user to db.', 500);
    return next(error)
  }

  res.status(201).json({ message: `Successfully created user` });
};

const login = async(req, res, next) => {
  const { username, password } = req.body;

  let existingUser
  try {
    existingUser = await User.findOne({username: username});
  } catch (err) {
    const error = new HttpErr("User with this username does not exist.", 422);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    throw new HttpErr("Could not identify user; invalid credentials.", 401);
  }
  res.json({ message: "Successfully logged in." });
};

module.exports = { getUsers, signup, login };

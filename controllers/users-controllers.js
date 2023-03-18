const HttpErr = require("../models/http-err");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

require("dotenv").config();

const User = require("../models/user")

const getUsers = async (req, res, next) => {
  const users = await User.find();
  res.json(users.map((user) => user.toObject({ getters: true })));
};

const signup = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpErr("Invalid Credentials", 422));
  }

  const { name, username, password } = req.body;

  let existingUser
  try {
    existingUser = await User.findOne({username});
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
  });

  try {
    await createdUser.save()
  } catch (err) {
    const error = new HttpErr('Could not save new user to db.', 500);
    return next(error)
  }

  res.status(201).json({ message: `Successfully created user ${createdUser.id}` });
};

const login = (req, res, next) => {
  const { username, password } = req.body;

  const identifiedUser = users.find((user) => user.username === username);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpErr("Could not identify user; incorrect credentials.", 401);
  }
  res.json({ message: "Successfully logged in." });
};

module.exports = { getUsers, signup, login };

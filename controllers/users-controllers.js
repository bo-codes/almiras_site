const HttpErr = require("../models/http-err");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

require("dotenv").config();

const users = [
  {
    id: "1",
    name: "Almira Akin",
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: users });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpErr("Invalid Credentials", 422));
  }

  const { name, username, password } = req.body;

  const createdUser = {
    id: uuidv4(),
    name,
    username,
    password,
  };

  users.push(createdUser);

  res.status(201).json({ message: `Successfully created user ${createdUser.id}`, users });
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

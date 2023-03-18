// pulling mongoose from node modules
const mongoose = require("mongoose");

const uniqueValidator = require('mongoose-unique-validator')

// pullling the Schema class from mongoose
const Schema = mongoose.Schema;

// creating a new instance of the Schema class for our posts
const userSchema = new Schema({
  // the format for each property of our model is to se the type, then add required if necessary. it's similar to sequelize, etc.
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

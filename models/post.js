// pulling mongoose from node modules
const mongoose = require("mongoose")

// pullling the Schema class from mongoose
const Schema = mongoose.Schema;

// creating a new instance of the Schema class for our posts
const postSchema = new Schema({
  // the format for each property of our model is to se the type, then add required if necessary. it's similar to sequelize, etc.
  img: { type: String, required: true},
  description: { type: String, required: true}
})

module.exports = mongoose.model('Post', postSchema);

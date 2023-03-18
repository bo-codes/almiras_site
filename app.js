const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts-routes");
const usersRoutes = require("./routes/users-routes");
const HttpErr = require("./models/http-err");

const app = express();

// BODY PARSER
// will parse any incoming request party and will extract any JSON data and then convert it into objects and arrays we can read in javascript
app.use(bodyParser.json());

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

// an err handler that only runs if someone sends a request to a route that doesn't exist. remember, these lines run in order from top to bottom, so all of the routes above will be hit first, and then we will hit this err handler
app.use((req, res, next) => {
  const err = new HttpErr("This route does not exist", 404);
  // throw(err);
  next(err);
});

// writing a middleware function like this one, with 4 parameters, express will treat this as a special function. It will automatically see it as an err handler middleware function.
// this function will only be executed on the requests that have an err attached to it/ any request where an error was thrown in the end.
// basically, this err handling middleware function will execute if any middleware in front of it yields and err.
// this will take those errors, and then handle them/do sumn with them
app.use((err, req, res, next) => {
  // this checks if we already sent a response. we have to check this because we are limited to sending one response. if we try to send one more, we will error out
  if (res.headerSent) {
    // if we have already sent a response for the current err we are on, we will just move on to the next err.
    return next(err);
  }
  // if no response has been sent, we want to send one. we will be shuffling throegh each err, running this middleware.
  // we will take the err code frome the given error and display it.
  // If no err code was provided, then we will default to a 500 status code
  res.status(err.code || 500);
  // we are doing the exact same thing with the message we are sending back for each err.
  res.json({ message: err.message + ", bobo" || "An unknown error occured" });
});

// first we are running the 'connect' method from mongoose which will try to establish a connection to our db.
// if the connection is successful, then we will run the app.listen() function.
// if the connection is not successful, we will catch and print any errors.
mongoose
  .connect(
    // we are getting this 'url' by going to our cluster in mongodb atlas, and clicking connect, and choosing the connect with application option.
    "mongodb+srv://bocoding888:Boboji004004@cluster0.7njzpx7.mongodb.net/posts?retryWrites=true&w=majority"
  )
  .then(app.listen(3001))
  .catch((err) => console.log(err));
// app.listen(3001);

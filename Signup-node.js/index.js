const express = require("express");
const ejs = require("ejs");
const PORT = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/Users");
mongoose.connect("mongodb://localhost:27017/usersDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(express.static("views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// PORTS REQUEST ARE HERE //
app.post("/register", (req, res) => {
  const username = req.body.username;
  const mobilenumber = req.body.mobilenumber;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    username: username,
    mobilenumber: mobilenumber,
    email: email,
    password: password,
  });

  newUser.save((err) => {
    err ? console.log(err) : res.send("Successfully Created User");
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, (err, foundResults) => {
    if (err) {
      console.log(err);
    } else {
      if (foundResults.password === password) {
        res.render("hello");
      } else {
        res.send("Incorrect Email or Password");
      }
    }
  });
});

app.listen(PORT, () => console.log("Server Started On Port 3000"));

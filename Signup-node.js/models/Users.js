const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  username: String,
  mobilenumber: Number,
  email: String,
  password: String,
});

const User = new mongoose.model("User", UsersSchema);

module.exports = User;

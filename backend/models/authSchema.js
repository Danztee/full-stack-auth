const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "please provide your first name"],
  },
  lastName: {
    type: String,
    required: [true, "please provide your last name"],
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide your password"],
  },
});

module.exports = mongoose.model("Auth", authSchema);

const Auth = require("../models/authSchema");

const register = (req, res) => {
  res.status(201).json({ message: "user registration successful" });
};
const login = () => {
  res.status(201).json({ message: "successfully logged in" });
};

module.exports = { register, login };

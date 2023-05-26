const Auth = require("../models/authSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const register = async (req, res) => {
  const { firstName, lastName, gender, email, password } = req.body;

  try {
    if (!firstName || !lastName || !gender || !email || !password)
      throw new Error("please fill in the required fields");

    const existing_user = await Auth.findOne({ email });
    if (existing_user) throw new Error("Email already exists");

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user in DB
    const user = await Auth.create({
      firstName,
      lastName,
      gender,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "user registered successfully",
      user: {
        email: user.email,
        id: user._id,
      },
      token: await generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      throw new Error("please fill in the email and password");

    const user = await Auth.findOne({ email });
    if (!user) throw new Error("user not found");

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw new Error("Incorrect password");

    res.status(201).json({
      message: "user logged in successfully",
      token: await generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const me = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login, me };

const express = require("express");
const {
  register,
  login,
  me,
  forgetPassword,
} = require("../controllers/AuthController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, me);
router.post("/forgetPassword", forgetPassword);

module.exports = router;

const mongoose = require("mongoose");
const crypto = require("crypto");

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
  passwordResetToken: String,

  passwordResetExpires: Date,
});

authSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Auth", authSchema);

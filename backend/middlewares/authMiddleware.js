const jwt = require("jsonwebtoken");
const Auth = require("../models/authSchema");

const protect = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    )
      throw new Error("not Authorized");

    const _token = req.headers.authorization.split(" ")[1];
    if (!_token) throw new Error("Not authorized, no token");

    const decoded = jwt.decode(_token, process.env.JWT_SECRET);
    if (decoded === null) throw new Error("Not authorized, Invalid token");
    if (!decoded.id) throw new Error("token not valid");

    const { id } = decoded;
    const authenticatedUser = await Auth.findById(id).select("-password");
    req.user = authenticatedUser;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { protect };

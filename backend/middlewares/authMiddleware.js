const jwt = require("jsonwebtoken");
const Auth = require("../models/authSchema");

const protect = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error("not authorized");

    if (req.headers.authorization.startsWith("Bearer")) {
      const _token = req.headers.authorization.split(" ")[1];

      if (!_token || _token === "null") throw new Error("no token");

      const decoded = jwt.decode(_token, process.env.JWT_SECRET);

      if (!decoded.id) throw new Error("token not valid");

      const { id } = decoded;

      const authenticatedUser = await Auth.findById(id).select("-password");
      req.user = authenticatedUser;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { protect };

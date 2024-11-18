const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");
const { NotAuthorized } = require("../errors/NotAuthorized");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new NotAuthorized("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    // if token is valid
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // if token is invalid
    return next(new NotAuthorized("Authorization required"));
  }

  req.user = payload;
  return next();
};

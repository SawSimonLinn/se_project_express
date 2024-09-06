const jwt = require("jsonwebtoken");
const { ERROR_CODES } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(ERROR_CODES.UNAUTHORIZED)
      .send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    console.error(e); // Log the error for debugging

    return res
      .status(ERROR_CODES.UNAUTHORIZED)
      .send({ message: "Authorization Required" });
  }

  req.user = payload;

  return next();
};

module.exports = { auth };

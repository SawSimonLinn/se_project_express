const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const UserSchema = require("../models/user");
const { ERROR_CODES } = require("../utils/errors");

// ? Create a new user (POST/api/users)
const createUsers = async (req, res) => {
  const { name, avatar, email, password } = req.body;

  try {
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res
        .status(ERROR_CODES.CONFLICT)
        .send({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserSchema({
      name,
      avatar,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.send({ data: savedUser });
  } catch (e) {
    console.error(e);
    if (e.code === 11000) {
      return res
        .status(ERROR_CODES.CONFLICT)
        .send({ message: "User with this email already exists" });
    }
    return res
      .status(ERROR_CODES.SERVER_ERROR)
      .send({ message: "Error from createUsers" });
  }

  return res.send({ name, avatar, email, password });
};

// ? Login user (POST/api/signin)
const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(ERROR_CODES.INVALID_DATA)
      .send({ message: "Email and password are required" });
  }

  return UserSchema.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(ERROR_CODES.REQUEST_SUCCESSFUL).send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password.") {
        return res
          .status(ERROR_CODES.UNAUTHORIZED)
          .send({ message: err.message });
      }

      return next(err);
    });
};

// ? Get current user (GET/api/users/me)
const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  UserSchema.findById(_id)
    .orFail(new Error("User not found"))
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.message === "User not found") {
        return res.status(ERROR_CODES.NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.INVALID_DATA)
          .send({ message: "Invalid ID" });
      }
      return next(err);
    });
};

// ? Update user (PATCH/api/users/me)
const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { name, avatar } = req.body;

  UserSchema.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(new Error("User not found"))
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.message === "User not found") {
        return res.status(ERROR_CODES.NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.INVALID_DATA)
          .send({ message: "Invalid ID" });
      }
      return next(err);
    });
};

// Export the functions
module.exports = {
  createUsers,
  loginUser,
  getCurrentUser,
  updateUser,
};

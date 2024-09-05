const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const userSchema = require("../models/user");
const { ERROR_CODES } = require("../utils/errors");

// ? Get all users (GET/api/users)
const getUsers = (req, res) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// ? Create a new user (POST/api/users)
const createUsers = async (req, res) => {
  const { name, avatar, email, password } = req.body;
  console.log(name, avatar, email, password);

  try {
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res
        .status(ERROR_CODES.CONFLICT)
        .send({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userSchema({
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
};

// ? Login user (POST/api/signin)
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body);
  // console.log(email, password);

  if (!email || !password) {
    return res
      .status(ERROR_CODES.INVALID_DATA)
      .send({ message: "Email and password are required" });
  }

  return userSchema
    .findUserByCredentials(email, password)
    .then((user) => {
      console.log("User found:", user);

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

// ? Get a user by id (GET/api/users/:userId)
const getUserById = (req, res) => {
  const { userId } = req.params;

  userSchema
    .findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: "User not found" });
      }
      return res.send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.INVALID_DATA)
          .send({ message: "Invalid ID" });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

//? Get current user (GET/api/users/me)
const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  console.log(_id);
  userSchema
    .findById(_id)
    .orFail(new Error("User not found"))
    .then((user) => {
      return res.send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "User not found") {
        return res.status(ERROR_CODES.NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.INVALID_DATA)
          .send({ message: "Invalid ID" });
      } else {
        next(err);
      }
      return next(err);
    });

  return res.send(user);
};
// Export the functions
module.exports = {
  getUsers,
  createUsers,
  getUserById,
  loginUser,
  getCurrentUser,
};

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
const createUsers = (req, res) => {
  const { name, avatar } = req.body;

  userSchema
    .create({ name, avatar })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      console.error(e);
      if (e.name === "ValidationError") {
        return res
          .status(ERROR_CODES.INVALID_DATA)
          .send({ message: "Invalid data" });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: "Error from createUsers" });
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

// Export the functions
module.exports = { getUsers, createUsers, getUserById };

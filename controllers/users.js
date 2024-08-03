const userSchema = require("../models/user");
const { ERROR_CODES } = require("../utils/errors");

// ? Get all users (GET/api/users)
const getUsers = (req, res) => {
  userSchema
    .find({})
    .then((users) => res.status(ERROR_CODES.REQUEST_SUCCESSFUL).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: err.message });
    });
};

// ? Create a new user (POST/api/users)
const createUsers = (req, res) => {
  console.log(req.body);

  const { name, avatar } = req.body;

  userSchema
    .create({ name, avatar })
    .then((item) => {
      console.log(item);
      res.status(ERROR_CODES.REQUEST_SUCCESSFUL).send({ data: item });
    })
    .catch((e) => {
      console.error(e);
      return res.status(ERROR_CODES.SERVER_ERROR).send({ message: e.message });
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
          .status(ERROR_CODES.INVALID_DATA)
          .send({ message: "User not found" });
      }
      return res.status(ERROR_CODES.REQUEST_SUCCESSFUL).send(user);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: err.message });
    });
};

// Export the functions
module.exports = { getUsers, createUsers, getUserById };

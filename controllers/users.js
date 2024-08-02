const userSchema = require("../models/user");

const getUsers = (req, res) => {
  userSchema
    .find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

const createUsers = (req, res) => {
  console.log(req.body);

  const { name, avatar } = req.body;

  userSchema
    .create({ name, avatar })
    .then((item) => {
      console.log(item);
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      console.error(e);
      return res.status(500).send({ message: e.message });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  userSchema
    .findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(400).send({ message: "User not found" });
      }
      res.send(user);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { getUsers, createUsers, getUserById };

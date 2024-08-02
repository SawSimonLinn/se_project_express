const router = require("express").Router();

const { getUsers, createUsers, getUserById } = require("../controllers/users");

// CRUD operations
router.get("/", getUsers);

// create a new user
router.post("/", createUsers);

// get a user by id
router.get("/:userId", getUserById);

module.exports = router;

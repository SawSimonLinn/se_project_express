const router = require("express").Router();

const { auth } = require("../middlewares/auth");

const {
  getCurrentUser,
  createUsers,
  getUserById,
} = require("../controllers/users");

// CRUD operations
router.get("/me", auth, getCurrentUser);

// create a new user
router.post("/", createUsers);

// get a user by id
router.get("/:userId", getUserById);

module.exports = router;

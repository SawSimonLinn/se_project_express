const router = require("express").Router();

const { auth } = require("../middlewares/auth");

const { getCurrentUser, updateUser } = require("../controllers/users");

// CRUD operations
router.get("/me", auth, getCurrentUser);

// Update user
router.patch("/me", auth, updateUser);

module.exports = router;

const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingItems");

const { ERROR_CODES } = require("../utils/errors");

const { loginUser, createUsers } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.post("/signin", loginUser);
router.post("/signup", createUsers);

router.use((req, res) => {
  res.status(ERROR_CODES.NOT_FOUND).send({ message: "Route not found" });
});

module.exports = router;

const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingItems");

const { auth } = require("../middlewares/auth");
const { ERROR_CODES } = require("../utils/errors");

const { loginUser, createUsers } = require("../controllers/users");

router.use("/users", auth, userRouter);
router.use("/items", itemRouter);

router.post("/signin", auth, loginUser);
router.post("/signup", auth, createUsers);

router.use((req, res) => {
  res.status(ERROR_CODES.NOT_FOUND).send({ message: "Route not found" });
});

module.exports = router;

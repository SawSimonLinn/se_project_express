const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingItems");

const ERROR_CODES = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  res.status(ERROR_CODES.NOT_FOUND).send({ message: "Route not found" });
});

module.exports = router;

const router = require("express").Router();

const userRouter = require("./users.js");
const itemRouter = require("./clothingItems.js");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  res.status(500).send({ message: "Router no found" });
});

module.exports = router;

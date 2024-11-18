const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { NotFound } = require("../errors/NotFound");

// Routes
router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use(() => {
  throw new NotFound("Route not found");
});

module.exports = router;

const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { NotFound } = require("../errors/NotFound");

const {
  validateAuthentication,
  validateUserBody,
} = require("../middlewares/validation");
const { logIn, createUser } = require("../controllers/users");

// ? POST /signin && /signup
router.post("/signin", validateAuthentication, logIn);
router.post("/signup", validateUserBody, createUser);

// Routes
router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use(() => {
  throw new NotFound("Route not found");
});

module.exports = router;

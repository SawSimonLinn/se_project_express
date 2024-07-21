const router = require("express").Router();

const userRouter = require("./users.js");

router.use("/", userRouter);

module.exports = router;

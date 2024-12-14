require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const app = express();
const { PORT = 3001 } = process.env;

const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const mainRouter = require("./routes/index");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch(console.error);

app.use(express.json());
app.use(requestLogger);
app.use(cors());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());

app.use((error, req, res, next) => {
  res.status(error.statusCode).send({ message: error.message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

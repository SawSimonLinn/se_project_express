const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const mainRouter = require("./routes/index");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// CORS
app.use(cors());

// JSON parsing
app.use(express.json());

// Routes
app.use("/", mainRouter);

// Error handling
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

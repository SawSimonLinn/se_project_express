const express = require("express");
const mongoose = require("mongoose");
const { createItem } = require("./controllers/clothingItems");

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

// Middleware
app.use((req, res, next) => {
  req.user = {
    _id: "66ac647e3708278d72c2b734",
  };
  next();
});

// JSON parsing
app.use(express.json());

// Routes
app.use("/", mainRouter);

// Error handling
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("This is working");
});

const clothingItemSchema = require("../models/clothingItem");
const { ERROR_CODES } = require("../utils/errors");

// ?  Create a new item (POST/api/clothingItems)
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  clothingItemSchema
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      console.error(e);
      if (e.name === "ValidationError") {
        return res
          .status(ERROR_CODES.INVALID_DATA)
          .send({ message: "Invalid data" });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: "Error form createItem" });
    });
};

// ? Get all items (GET/api/clothingItems)
const getItems = (req, res) => {
  clothingItemSchema
    .find({})
    .then((items) => res.send(items))
    .catch((e) => {
      console.error(e);
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: "Error form getItems" });
    });
};

// ? Delete an item (DELETE/api/clothingItems/:itemId)
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  clothingItemSchema
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      if (e.name === "CastError") {
        return res
          .status(ERROR_CODES.INVALID_DATA)
          .send({ message: "Invalid ID" });
      }
      if (e.name === "DocumentNotFoundError") {
        res.status(ERROR_CODES.NOT_FOUND).send({ message: "Item not found" });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: "Server error" });
    });
};

// ? Like an item (PUT/api/clothingItems/:itemId/likes)
const likeItem = (req, res) => {
  clothingItemSchema
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      if (e.name === "CastError") {
        return res
          .status(ERROR_CODES.INVALID_DATA)
          .send({ message: "Invalid ID" });
      }
      if (e.name === "DocumentNotFoundError") {
        res.status(ERROR_CODES.NOT_FOUND).send({ message: "Item not found" });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: "Server error" });
    });
};

// ? Unlike an item (DELETE/api/clothingItems/:itemId/likes)
const unlikeItem = (req, res) => {
  clothingItemSchema
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      if (e.name === "CastError") {
        return res
          .status(ERROR_CODES.INVALID_DATA)
          .send({ message: "Invalid ID" });
      }
      if (e.name === "DocumentNotFoundError") {
        res.status(ERROR_CODES.NOT_FOUND).send({ message: "Item not found" });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: "Server error" });
    });
};

// Export the functions
module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};

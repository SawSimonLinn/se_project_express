const clothingItemSchema = require("../models/clothingItem");

// Create a new item
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  console.log(name, weather, imageUrl, owner);

  clothingItemSchema
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      console.error(e);
      return res.status(500).send({ message: "Error form createItem", e });
    });
};

//Get all items
const getItems = (req, res) => {
  console.log("getItems called");
  clothingItemSchema
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: "Error form getItems", e });
    });
};

//Update an item
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { name, weather, imageUrl } = req.body;

  clothingItemSchema
    .findByIdAndUpdate(itemId, { name, weather, imageUrl }, { new: true })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      console.error(e);
      return res.status(500).send({ message: "Error from updateItem", e });
    });
};

//Delete an item
const deleteItem = (req, res) => {
  console.log("deleteItem called");
  const { itemId } = req.params;

  clothingItemSchema
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      console.error(e);
      return res.status(500).send({ message: "Error from deleteItem", e });
    });
};

//Like an item
const likeItem = (req, res) => {
  console.log("likeItem called");

  clothingItemSchema
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => {
      console.log(item);
      console.log(item.likes);
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      console.error(e);
      return res.status(500).send({ message: "Error from likeItem", e });
    });
};

//Unlike an item
const unlikeItem = (req, res) => {
  console.log("unlikeItem called");

  clothingItemSchema
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => {
      console.log(item);
      console.log(item.likes);
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      console.error(e);
      return res.status(500).send({ message: "Error from unlikeItem", e });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  unlikeItem,
};

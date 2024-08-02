const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

//Get all items
router.get("/", getItems);

// Create a new item
router.post("/", createItem);

//Delete an item
router.delete("/:itemId", deleteItem);

//Update an item
router.put("/:itemId", updateItem);

//Like an item
router.put("/:itemId/likes", likeItem);

//Unlike an item
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;

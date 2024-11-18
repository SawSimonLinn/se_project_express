const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateCardBody, validateId } = require("../middlewares/validation");
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  deleteLike,
} = require("../controllers/clothingItem");

// ? GET /items
router.get("/", getItems);

router.use(auth);

// ? POST /items
router.post("/", validateCardBody, createItem);

// ? PUT /items/:itemId/likes
router.put("/:itemId/likes", validateId, likeItem);

// ? DELETE /items/:itemId/likes
router.delete("/:itemId/likes", validateId, deleteLike);
router.delete("/:itemId", validateId, deleteItem);

module.exports = router;

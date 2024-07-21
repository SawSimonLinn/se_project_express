const mongoose = require("mongoose");

const clothingItemSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
    default: "hot",
  },
  imageUrl: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", default: [] }],
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("item", clothingItemSchema);

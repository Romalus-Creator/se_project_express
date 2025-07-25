const mongoose = require("mongoose");
const validator = require("validator");
const user = require("./user");

//TODO - Ensure the onwer, likes, and createdAt are done correctly.
const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    enum: ["hot", "warm", "cold"],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  // owner: user._id,
  // likes: [
  //   {
  //     users: user,
  //   },
  // ],
  // createdAt: {},
});

module.exports = mongoose.model("clothingItem", clothingItemSchema);

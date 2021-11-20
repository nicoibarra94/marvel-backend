const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: "string",
    required: true,
  },
  favorites: { comics: [], characters: [] },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;

const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite", {
  id: String,
  name: String,
  description: String,
  photo: String,
  type: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favorite;

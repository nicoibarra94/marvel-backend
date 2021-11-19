const express = require("express");
const router = express.Router();

const Favorite = require("../models/Favorite");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/favorites", isAuthenticated, async (req, res) => {
  try {
    const favorites = await Favorite.find({ owner: req.user });
    res.json(favorites);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;

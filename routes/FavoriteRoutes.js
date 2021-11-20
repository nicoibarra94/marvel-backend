const express = require("express");
const router = express.Router();

const User = require("../models/User");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/favorites", isAuthenticated, async (req, res) => {
  try {
    const userConnected = await User.findById(req.user._id);
    res.json(userConnected.favorites);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;

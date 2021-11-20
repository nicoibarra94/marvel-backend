const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const axios = require("axios");

const User = require("../models/User");

const apiKey = "FRPJzXKxhsGyEfxr";

const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/characters", async (req, res) => {
  try {
    let skip = 0;

    if (req.query.skip > 1) {
      skip = req.query.skip * 100;
    }

    let title = req.query.title;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}&skip=${skip}&name=${title}`
    );
    const data = response.data;
    res.json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/characters/addfavorite", isAuthenticated, async (req, res) => {
  try {
    const newFavorite = await User.findById(req.user._id);
    newFavorite.favorites.characters.push(req.query);
    await newFavorite.save();
    res.status(200).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

//Try the method search to do the search of the comics. To see if it works better.

const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const axios = require("axios");

const User = require("../models/User");

const apiKey = "FRPJzXKxhsGyEfxr";

const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/comics", async (req, res) => {
  try {
    let skip = 0;

    if (req.query.skip > 1) {
      skip = req.query.skip * 100;
    }

    let title = req.query.title;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&skip=${skip}&title=${title}`
    );
    const data = response.data.results;

    res.json({ data });
  } catch (errors) {
    res.status(400).json({ message: errors.message });
  }
});

router.get("/comics/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${apiKey}`
    );
    const data = response.data;
    res.json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/comics/addfavorite", isAuthenticated, async (req, res) => {
  try {
    console.log(req.query);
    const newFavorite = await User.findById(req.user._id);
    newFavorite.favorites.comics.push(req.query);
    await newFavorite.save();
    res.status(200).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

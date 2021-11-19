//Try the method search to do the search of the comics. To see if it works better.

const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const axios = require("axios");

const Favorite = require("../models/Favorite");

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
    const newFavorite = new Favorite({
      id: req.query.id,
      name: req.query.name,
      description: req.query.description,
      photo: req.query.photo,
      type: req.query.type,
      owner: req.user,
    });
    await newFavorite.save();
    res.json(newFavorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const axios = require("axios");

const User = require("../models/User");

const apiKey = process.env.MARVEL_APIKEY;

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
    const newFavorite = await User.findById(req.user._id);

    const favoritesList = newFavorite.favorites.comics;

    if (favoritesList.length === 0) {
      newFavorite.favorites.comics.push(req.query);
      await newFavorite.save();
      return res.status(200).json();
    } else {
      let exist = false;
      for (let i = 0; i < favoritesList.length; i++) {
        if (favoritesList[i].id.indexOf(req.query.id) !== -1) {
          exist = true;
        }
      }
      if (exist === true) {
        res.json({
          error: "¡ You already have this comic in your favorite list !",
        });
      } else {
        newFavorite.favorites.comics.push(req.query);
        await newFavorite.save();
        return res.status(200).json();
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

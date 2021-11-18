const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());

const apiKey = "FRPJzXKxhsGyEfxr";

const CharactersRoutes = require("./routes/CharacterRoutes");
const ComicsRoutes = require("./routes/ComicsRoutes");

app.use(CharactersRoutes);
app.use(ComicsRoutes);

app.all("*", (req, res) => {
  res.status(400).json({ message: error.message });
});

app.listen(3000, () => {
  console.log("Server has started");
});

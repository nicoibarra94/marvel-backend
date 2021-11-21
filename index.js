const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(formidable());
app.use(cors());

const CharactersRoutes = require("./routes/CharacterRoutes");
const ComicsRoutes = require("./routes/ComicsRoutes");
const UserRoutes = require("./routes/UserRoutes");
const FavoriteRoutes = require("./routes/FavoriteRoutes");

app.use(CharactersRoutes);
app.use(ComicsRoutes);
app.use(UserRoutes);
app.use(FavoriteRoutes);

app.all("*", (req, res) => {
  res.status(400).json({ message: error.message });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});

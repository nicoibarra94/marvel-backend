const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.connect(
  "mongodb+srv://nnibarra:EFcSsrcdrNGbt3JT@cluster0.pfvsw.mongodb.net/Marvel"
);

const app = express();
app.use(formidable());
app.use(cors());

const apiKey = "FRPJzXKxhsGyEfxr";

const CharactersRoutes = require("./routes/CharacterRoutes");
const ComicsRoutes = require("./routes/ComicsRoutes");
const UserRoutes = require("./routes/UserRoutes");

app.use(CharactersRoutes);
app.use(ComicsRoutes);
app.use(UserRoutes);

app.all("*", (req, res) => {
  res.status(400).json({ message: error.message });
});

app.listen(3000, () => {
  console.log("Server has started");
});

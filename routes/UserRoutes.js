const express = require("express");
const router = express.Router();

const User = require("../models/User");

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

router.post("/user/signup", async (req, res) => {
  try {
    if (req.fields.email) {
    } else {
      return res.json({ Error: "Please enter your email." });
    }
    if (req.fields.password) {
    } else {
      return res.json({ Error: "Please enter your password." });
    }

    try {
      const userEmailSearch = await User.findOne({ email: req.fields.email });
      if (req.fields.email === userEmailSearch.email) {
        return res.json({
          Error: "This email is already associated with an account",
        });
      }
    } catch {}

    const password = req.fields.password;
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(16);
    const newUser = new User({
      email: req.fields.email,
      token: token,
      hash: hash,
      salt: salt,
    });
    await newUser.save();
    res.json({ newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    if (req.fields.email) {
    } else {
      return res.json({ Error: "Please enter your email." });
    }
    if (req.fields.password) {
    } else {
      return res.json({ Error: "Please enter your password." });
    }

    const userEmailSearch = await User.findOne({ email: req.fields.email });
    if (userEmailSearch) {
      const hashUserLogIn = SHA256(
        req.fields.password + userEmailSearch.salt
      ).toString(encBase64);
      if (userEmailSearch.hash === hashUserLogIn) {
        res.json({
          _id: userEmailSearch._id,
          token: userEmailSearch.token,
          account: userEmailSearch.account,
        });
      } else {
        res.json({ Error: "Please enter a valid email address and password" });
      }
    } else {
      res.json({ Error: "Please enter a valid email address and password" });
    }
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
});

module.exports = router;

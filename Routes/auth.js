const express = require("express")
const router = express.Router();
const UserSchema = require("../Models/UserSchema");

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await UserSchema.findOne({
      username: req.body.username,
      password: req.body.password
    });
    !user && res.status(400).json("user not found!");

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err);
  }
});

//REGISTER

router.post("/register", async (req, res) => {
  try {
    const newUser = new UserSchema({
      username: req.body.username,
      password: req.body.password,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

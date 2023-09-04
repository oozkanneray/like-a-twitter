const router = require("express").Router();
const UserSchema = require("../Models/UserSchema");

//UPDATE USER

router.put("/:id", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    try {
      const updateUser = await UserSchema.findByIdAndUpdate(
        req.params.id,
        {
          username: req.body.username,
          password: req.body.password,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE USER
router.delete("/:id", async (res, req) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    try {
      await user.deleteOne();
      res.status(200).json("user deleted");
    } catch (err) {
      res.status(401).json("user not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER BY ID
router.get("/:id", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

//GET ALL USERS

router.get("/all", async (req, res) => {
  try {
    const allUsers = await UserSchema.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

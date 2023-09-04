const express = require("express");
const PostSchema = require("../Models/PostSchema");
const router = express.Router();

//CREATE POST

router.post("/new", async (req, res) => {
  const today = new Date().toLocaleDateString();

  const newPost = new PostSchema({
    username: req.body.username,
    text: req.body.text,
    date: today,
  });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST

router.put("/:id", async (req, res) => {
    try {
      const post = await PostSchema.findById(req.params.id);
        try {
          const updatedPost = await PostSchema.findByIdAndUpdate(
            req.params.id,
            {
              text: req.body.text,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);
    try {
      await post.deleteOne();
      res.status(200).json("post deleted.");
    } catch (err) {
      res.status(401).json("post not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST FROM ID

router.get("/:id", async (req, res) => {
  try {
    const findById = await PostSchema.findById(req.params.id);
    res.status(200).json(findById);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/all", async (req, res) => {
  try {
    const allPosts = await PostSchema.find();
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

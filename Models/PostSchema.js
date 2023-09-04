const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  text:{
    type:String,
    required:true,
    maxLength:100
  },
  date:{
    type:Date,
    required:true,
  }
});

module.exports = mongoose.model("Post", PostSchema);

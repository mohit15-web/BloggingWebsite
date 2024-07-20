const Post = require("../models/post");
const createPost = async (req, res) => {
  console.log(req.body);
  try {
    let insertedData = await Post.create(req.body);
  res.json({
    success: true,
    message: "post created successfully",
  });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const listPost = async (req, res) => {
  try {
    let list = await Post.find();
    res.json({
      success: true,
      list,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const postController = {
  createPost,
  listPost
};

module.exports = postController;

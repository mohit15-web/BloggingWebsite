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

const postController = {
  createPost,
};

module.exports = postController;

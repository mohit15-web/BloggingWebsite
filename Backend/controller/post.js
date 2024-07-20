const Post = require('../models/post');
const createPost = async(req, res) => {
    console.log(req.body)
    let insertedData = await Post.create(req.body)
  res.json({
    success: true,
    message: "post created successfully",
  });
};


const postController = {
  createPost,
}

module.exports = postController
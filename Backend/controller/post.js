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

const editPost = async(req,res) => {
  let id = req.params.postId
  try {
    let updateData = await Post.findByIdAndUpdate(id,req.body)
    res.json({
      success:true,
      message:"post edited successfully"
    })
  } catch (error) {
    res.status(403).json({
      success:false,
      message:error
    })
  }
}

const deletePost = async(req,res) => {
  let id = req.params.postId
  try {
    let updateData = await Post.findByIdAndDelete(id)
    res.json({
      success:true,
      message:"post deleted successfully"
    })
  } catch (error) {
    res.status(403).json({
      success:false,
      message:error
    })
  }
}

const postController = {
  createPost,
  listPost,
  editPost,
  deletePost
};

module.exports = postController;

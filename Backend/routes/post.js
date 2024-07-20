
const express = require('express');
const postController = require('../controller/post');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create',authMiddleware, postController.createPost);


module.exports = router
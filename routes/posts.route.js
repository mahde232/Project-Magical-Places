const express = require('express');
const postController = require('../controllers/post.controller');
const router = express.Router();

router.get('/', (req, res) => { //Get All Posts
    postController.getAllPosts(req, res);
})

module.exports = router;
const express = require('express');
const postController = require('../controllers/post.controller');
const authMiddleware = require('../express_middleware/auth');
const adminCheckPosts = require('../express_middleware/adminCheckPosts')
const router = express.Router();

//GET requests
router.get('/', (req, res) => { //Get All Posts (multiple results)
    postController.getAllPosts(req, res);
}).get('/id=:id', (req, res) => { //Get specific post by id (1 result)
    postController.getSpecificPost(req, res);
}).get('/search/?creator=:name&?title=:title&?category=:category&?region=:region&?tag=:tag', (req, res) => { //Get posts by multiple queries (multiple results)
    postController.getPostsByQuery(req, res);
}).get('/category=:id', (req, res) => { //Get posts by category ID (multiple results)
    postController.getPostsByCategory(req, res);
}).get('/region=:id', (req, res) => { //Get posts by region ID (multiple results)
    postController.getPostsByRegion(req, res);
}).get('/me', authMiddleware, (req, res) => { //Get my posts (multiple results)
    postController.getMyPosts(req, res);
})

//POST requests
router.post('/', authMiddleware, (req, res) => { //create post under userID
    postController.createPost(req, res);
})

//DELETE requests
router.delete('/id=:id', authMiddleware, adminCheckPosts, (req, res) => { //delete post by id
    postController.deletePost(req, res);
})

//PUT requests
router.put('/id=:id', authMiddleware, adminCheckPosts, (req, res) => { //edit post by id
    postController.updatePost(req, res);
})

module.exports = router;
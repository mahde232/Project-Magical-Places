const express = require('express');
const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../express_middleware/auth');
const adminCheckComments = require('../express_middleware/adminCheckComments')
const router = express.Router();

//GET requests
router.get('/', (req, res) => { //Get All Comments (multiple results)
    commentController.getAllComments(req, res);
}).get('/id=:id', (req, res) => { //Get specific comment by id (1 result)
    commentController.getSpecificComment(req, res);
}).get('/me', authMiddleware, (req, res) => { //Get my comments (multiple results)
    commentController.getMyComments(req, res);
})

//POST requests
router.post('/', authMiddleware, (req, res) => { //create comment under userID
    commentController.createComment(req, res);
})

//DELETE requests
router.delete('/id=:id', authMiddleware, adminCheckComments, (req, res) => { //delete comment by id
    commentController.deleteComment(req, res);
})

//PUT requests
router.put('/id=:id', authMiddleware, adminCheckComments, (req, res) => { //edit comment by id
    commentController.updateComment(req, res);
})

module.exports = router;
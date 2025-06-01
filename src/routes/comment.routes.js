const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const authenticate = require('../middlewares/auth.middleware'); // если есть

router.get('/:postId', commentController.getCommentsByPostId);
router.post('/:postId', authenticate, commentController.createComment);

module.exports = router;

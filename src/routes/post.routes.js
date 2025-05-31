const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const likeController = require('../controllers/like.controller');
const authenticate = require('../middlewares/auth.middleware');

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.post('/:postId/like', authenticate, likeController.toggleLike);


module.exports = router;

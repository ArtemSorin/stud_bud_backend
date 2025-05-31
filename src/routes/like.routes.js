const express = require('express');
const router = express.Router();
const { toggleLike } = require('../controllers/like.controller');
const authenticate = require('../middlewares/auth.middleware');

router.post('/:postId/toggle', authenticate, toggleLike);

module.exports = router;

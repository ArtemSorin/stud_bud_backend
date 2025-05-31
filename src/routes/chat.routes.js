const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const authenticate = require('../middlewares/auth.middleware');

router.get('/', authenticate, chatController.getUserChats);
router.post('/', authenticate, chatController.createChat);

module.exports = router;

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const authenticate = require('../middlewares/auth.middleware');

router.get('/:chatId', authenticate, messageController.getMessages);
router.post('/:chatId', authenticate, messageController.sendMessage);

module.exports = router;

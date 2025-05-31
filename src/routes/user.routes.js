const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/user.controller');
const authenticate = require('../middlewares/auth.middleware');

router.get('/me', authenticate, getUserProfile);

module.exports = router;

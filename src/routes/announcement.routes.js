const express = require('express');
const router = express.Router();
const { getAllAnnouncements } = require('../controllers/announcement.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, getAllAnnouncements);

module.exports = router;

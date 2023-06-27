const express = require('express');
const router = express.Router();
const userClicks = require('../Controllers/userClicksController');

router.patch('/:userId', userClicks);

module.exports = router;

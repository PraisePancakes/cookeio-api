const express = require('express');
const router = express.Router();
const register = require('../Controllers/registerController');

router.post('/', register);

module.exports = router;

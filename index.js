const express = require('express');
const UserModel = require('./Models/User');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = require('./Controllers/registerController');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const URI = process.env.CONNECT_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT_NUMBER = process.env.PORT_NUM;

mongoose.connect(URI);

app.post('/register', register);

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
});

app.listen(PORT_NUMBER, () => {
  console.log(`CONNECTED TO ${PORT_NUMBER}`);
});

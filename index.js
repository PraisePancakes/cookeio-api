const express = require('express');
const UserModel = require('./Models/User');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
console.log('Hi');
const app = express();
app.use(express.json());
app.use(cors());

const URI = process.env.CONNECT_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT_NUMBER = process.env.PORT_NUMBER;

mongoose.connect(URI);

app.listen(PORT_NUMBER, () => {
  console.log(`CONNECTED TO ${PORT_NUMBER}`);
});

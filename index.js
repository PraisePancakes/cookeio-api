const express = require('express');
const UserModel = require('./Models/User');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginRoute = require('./Routes/login');
const registerRoute = require('./Routes/register');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const URI = process.env.CONNECT_URI;

const PORT_NUMBER = process.env.PORT_NUM;

mongoose.connect(URI);

app.use('/login', loginRoute);
app.use('/register', registerRoute);

app.listen(PORT_NUMBER, () => {
  console.log(`CONNECTED TO ${PORT_NUMBER}`);
});

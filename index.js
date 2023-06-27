const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const loginRoute = require('./Routes/login');
const registerRoute = require('./Routes/register');
const userClicksRoute = require('./Routes/userClicks');
const UserModel = require('./Models/User');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const URI = process.env.CONNECT_URI;
const PORT_NUMBER = process.env.PORT_NUM;

mongoose.connect(URI);

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/userClicks', userClicksRoute);

app.get('/leaderboards', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT_NUMBER, () => {
  console.log(`CONNECTED TO ${PORT_NUMBER}`);
});

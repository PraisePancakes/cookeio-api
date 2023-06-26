const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');

const loginRoute = require('./Routes/login');
const registerRoute = require('./Routes/register');
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

app.patch('/userClicks/:userId', async (req, res) => {
  const { userId } = req.params;
  const { count } = req.body;

  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { clicks: count + 1 },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    console.log(req.body);
    res.send(user);
  } catch (error) {
    console.error('Failed to update user count: ', error);
    res.status(500).send({ error: 'Failed to update user count' });
  }
});

app.listen(PORT_NUMBER, () => {
  console.log(`CONNECTED TO ${PORT_NUMBER}`);
});

const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.SECRET_KEY;

module.exports = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await UserModel.findOne({ username });

  if (!userExists) {
    return res.status(404).send({ message: 'User not found!' });
  } else if (username === '') {
    return res.status(400).send({ error: 'Please Enter an username' });
  } else if (password === '') {
    return res.status(400).send({ error: 'Please Enter an password' });
  }

  const matched = await bcrypt.compare(password, userExists.password);

  if (!matched) {
    return res.status(404).send({ message: 'Incorrect Password' });
  }

  const token = jwt.sign(
    {
      userId: userExists._id,
      username: userExists.username,
      clicks: userExists.clicks,
    },
    JWT_SECRET,
    { expiresIn: '10m' }
  );

  return res.status(200).send({
    message: 'Login Successful',
    username: userExists.username,
    token,
  });
};

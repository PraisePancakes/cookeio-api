const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await UserModel.findOne({ username });

  if (!userExists) {
    return res.status(404).send({ message: 'User not found!' });
  }

  const matched = await bcrypt.compare(password, userExists.password);

  if (!matched) {
    return res.status(404).send({ message: 'Incorrect Password' });
  }

  const token = jwt.sign(
    {
      userId: userExists._id,
      username: userExists.username,
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  return res.status(200).send({
    message: 'Login Successful',
    uesrname: userExists.username,
    token,
  });
};

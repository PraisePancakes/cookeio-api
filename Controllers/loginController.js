const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.SECRET_KEY;

module.exports = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await UserModel.findOne({ username });

  if (!userExists) {
    return res.status(400).send({ message: 'Incorrect username or password' });
  }

  const matched = await bcrypt.compare(password, userExists.password);

  if (!matched) {
    return res.status(400).send({ message: 'Incorrect username or password' });
  }

  const token = jwt.sign(
    {
      userId: userExists._id,
      username: userExists.username,
      createdAt: userExists.createdAt,
    },
    JWT_SECRET,
    { expiresIn: '10m' }
  );

  return res.status(200).send({
    message: 'Successfully Logged In!',
    username: userExists.username,
    token,
  });
};

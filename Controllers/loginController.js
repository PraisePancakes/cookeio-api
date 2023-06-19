const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET;

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

  return res.status(200).send({ message: 'Logged In' });
};

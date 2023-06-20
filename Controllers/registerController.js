const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const { email, username, password } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    return res
      .status(400)
      .send({ message: 'User with that email already exists' });
  } else if (email === '') {
    return res.status(400).send({ error: 'Please Enter an email' });
  } else if (username === '') {
    return res.status(400).send({ error: 'Please Enter an username' });
  } else if (password === '') {
    return res.status(400).send({ error: 'Please Enter an password' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    email,
    username,
    password: hashedPassword,
  });

  await newUser.save();

  res.send(newUser);
};

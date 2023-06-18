const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
  email: { type: String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const UserModel = new mongoose.model('user', UserShema);

module.exports = UserModel;

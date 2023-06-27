const UserModel = require('../Models/User');

module.exports = async (req, res) => {
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
    const clicks = user.clicks;
    res.send({ clicks });
  } catch (error) {
    console.error('Failed to update user count: ', error);
    res.status(500).send({ error: 'Failed to update user count' });
  }
};

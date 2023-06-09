const userService = require('../../services/user/user.service');

const getUserId = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);

  try {
    const user = await userService.getUserById(id);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUserId,
};

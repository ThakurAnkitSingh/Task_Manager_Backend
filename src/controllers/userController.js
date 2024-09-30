const userService = require('../services/userService');

const getUser = async (req, res) => {
  try {
    const { email } = req?.user;
    const userId = req?.user?.userId;
    const message = await userService.UserAuthorization(email, userId);
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const message = await userService.setUserPassword(email, password);
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const ProfileUser = async (req, res) => {
  try {
    const { profilePic } = req?.body;
    const userId = req?.user?.userId;
    const message = await userService.setUserProfileUrl(profilePic, userId);
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, google_id } = req.body;
    const token = await userService.registerUser(name, email, password, google_id);
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUserPassword,
  ProfileUser
};
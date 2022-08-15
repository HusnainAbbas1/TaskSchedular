const User = require("../Models/users");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");

exports.Authentiaction = async (req, res) => {
  const { userName, password } = req.body;
  const currentUser = await User.findOne({ userName });

  const dataBasePassword = currentUser.password;
  const isMatch = await bcrypt.compare(password, dataBasePassword);

  if (isMatch) {
    sendToken(currentUser, 200, res);
  }
};

exports.createUser = async (req, res) => {
  const createdUser = await User.create(req.body);
  console.log(createdUser);
};

 
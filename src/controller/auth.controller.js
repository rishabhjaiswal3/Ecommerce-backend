const userService = require("../services/user.service");
const jwtProvider = require("../config/jwtProvider");
const cartService = require('../services/cart.service');
const bcrypt = require('bcrypt')

const register = async (req, res) => {
  try {
    console.log("my uuser ody is ",req.body);
    const user = await userService.createUser(req.body);
    const token = jwtProvider.generateToken(user);

    await cartService.createCart(user)
    return res.status(200).send({ token, message: "register Success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User Not Found With Email", email });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({ message: "Invalid Password..." });
    }
    const jwt = jwtProvider.generateToken(user._id, user?.role);
    return res.status(200).send({ jwt, message: "Login Success..." });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { login, register };

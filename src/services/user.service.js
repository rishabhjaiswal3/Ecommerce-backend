const Address = require('../models/address.model')
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider");

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;

    const isEmailExisted = await User.findOne({ email });

    if (isEmailExisted) {
      throw new Error("Email is already existed ", email);
    }

    password = await bcrypt.hash(password, 8);
    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });
    await user.save();
    console.log("Created user ", user);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findById(id).populate("address");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found with email ", email);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);
    console.log("my token is ",token);
    console.log("my user Id is",userId);
    const user = await findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  getAllUsers,
  getUserProfileByToken,
};

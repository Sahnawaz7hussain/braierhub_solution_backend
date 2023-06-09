const { UserModel } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;

const signup = async (req, res) => {
  let { email, name, password } = req.body;

  try {
    let isUserPresent = (await UserModel.findOne({ email })) || null;
    if (isUserPresent) {
      res.status(403).json({ message: "User already exist." });
    } else {
      const hash = bcrypt.hashSync(password, salt);
      let newUser = new UserModel({ email, name, password: hash });
      await newUser.save();
      res.status(200).json({ message: "signup succesfull", user: req.body });
    }
  } catch (err) {
    res.status(500).json({ message: "something went wrong", err: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = (await UserModel.findOne({ email })) || null;
    if (!userFound) return res.status(404).json({ message: "User not found!" });

    let isCorrectPassword = bcrypt.compareSync(password, userFound.password);
    if (isCorrectPassword) {
      // generate token
      const token = jwt.sign({ userId: userFound._id }, secret, {
        expiresIn: "1h",
      });
      res.status(200).send({ message: "Login Success", token: token });
    } else {
      return res.status(401).json({ message: "Wrong password" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong please try again later",
      err: err.message,
    });
  }
};

module.exports = { signup, login };

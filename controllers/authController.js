const express = require("express");
const app = express();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const maxAge = 1000 * 60 * 60 * 24 * 10;

const createToken = (id) => {
  //signing the jwt (So this will be unique for every user)
  return jwt.sign({ id }, "couponzo secret key", {
    expiresIn: maxAge,
  });
};

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.register = async (req, res) => {
  try {
    const { email, userName, password, companyName } = req.body;
    const user = await User.create({
      email: email,
      userName: userName,
      password: password,
      companyName: companyName,
    });
    const token = createToken(user._id);
    console.log("reached here");
    console.log(token);

    res.cookie("jwt", token, {
      sameSite: true,
      maxAge: maxAge,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.json({ errors });
  }
};

module.exports.login = async (req, res) => {
  try {
    console.log("request made");
    const { email, password } = req.body;
    //If the email or password is incorrect it will throw Error(conditions defined in the login method of User Schema)
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);

    res.status(400).json({ errors });
  }
};

module.exports.test = async (req, res, next) => {
  const documents = await User.find();
  res.send(documents);
};

module.exports.clear = async (req, res, next) => {
  const status = await User.deleteMany();
  console.log("All clear");
  res.status(200).json();
};

module.exports.verify = async (req, res) => {
  console.log(req.headers);
  res.send(req.headers);
};

module.exports.logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};

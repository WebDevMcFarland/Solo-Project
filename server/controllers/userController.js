// const bcrypt = require('bcryptjs');
const User = require("../models/userModel");

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  //   console.log(req.body)

  if (!username || !password)
    return next({
      log: "Missing username or password",
      status: 400,
      message: { err: "An error occured in the create user function" },
    });
  try {
    const user = await User.create({ username, password });
    res.locals.user = user;
    console.log(user);
    return next();
  } catch (err) {
    return next({
      log: "An error occured in the userController",
      status: 500,
      message: { err: "An error occured in the create user function" },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      log: "Missing username or password",
      status: 400,
      message: { err: "An error occured in the create user function" },
    });
  }
  try {
    const user = await User.findOne({ username });

    if (!user) return res.redirect("/register");

    const result = password === user.password;
    if (!result) return res.redirect("/register");

    res.cookie("SSID", user._id, { httpOnly: true });

    res.locals.id = user._id;
    console.log(user._id);
    return next();
  } catch (err) {
    return next({
      log: "An error occured in the userController",
      status: 500,
      message: { err: "An error occured in the verifyUser function" },
    });
  }
};


userController.loggedIn = async (req, res, next) => {
  const SSID = req.cookies["SSID"];

  try {
    const user = await User.findById(SSID);
    if (!user) res.redirect("/login");
    else return next();
  } catch (err) {
    return next({
      log: "User  Not Logged in",
      status: 500,
      message: { err: "An error occured in the loggedIn function" },
    });
  }
};


module.exports = userController;

const express = require("express");
const bcrypt = require("bcrypt");
// Function that checks that the user has a valid toucan
const { auth } = require("../middlewares/auth");
const {
  validateUser,
  UserModel,
  validateLogin,
  genToken,
} = require("../models/userModel");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Users work" });
});

router.get("/userInfo", auth, async (req, res) => {
  let user = await UserModel.findOne(
    { _id: req.userTokenData._id },
    { password: 0 }
  );
  // res.json(req.userTokenData)
  res.json(user);
});

// Sign up a new user
router.post("/", async (req, res) => {
  let validBody = validateUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = new UserModel(req.body);
    // Encrypt password encryption level 10
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    // Hide password from client side
    user.password = "Hidden Pass ***";
    res.json(user);
  } catch (err) {
    // Checking if the mistake is an email case that exists
    if (err.code == 11000) {
      return res
        .status(500)
        .json({ msg: "Email already in system , try login" });
    }
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  let validBody = validateLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    // Check if there's any user used this email
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ msg: "Email not found !!" });
    }
    //Checking the password
    let validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(401).json({ msg: "Password or email is worng !!" });
    }
    let newToken = genToken(user._id);
    res.json({ token: newToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

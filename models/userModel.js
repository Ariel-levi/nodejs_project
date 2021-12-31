const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  // role-> User type if normal or admin
  role: {
    type: String,
    default: "regular",
  },
  date_created: {
    type: Date,
    default: Date.now(),
  },
});

exports.UserModel = mongoose.model("users", userSchema);
// create token
exports.genToken = (_id) => {
  let token = jwt.sign({ _id: _id }, "ariel1234", { expiresIn: "60mins" });
  return token;
};

exports.validateUser = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(99).required(),
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string().min(3).max(99).required(),
  });
  return joiSchema.validate(_reqBody);
};

// User Log-In Valdization
exports.validateLogin = (_reqBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string().min(3).max(99).required(),
  });
  return joiSchema.validate(_reqBody);
};

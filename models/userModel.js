const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");


let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  // role-> סוג משתמש אם רגיל או אדמין
  role: {
    type: String, default: "regular"
  },
  date_created: {
    type: Date, default: Date.now()
  }
})

exports.UserModel = mongoose.model("users", userSchema);
// מייצר טוקן
exports.genToken = (_id) => {
  // תכולה במקרה שלנו רק איי די של המשתמש, מילה
  // סודית , ותוקף
  let token = jwt.sign({_id:_id}, "ariel1234", {expiresIn:"60mins"});
  return token;
}


exports.validateUser = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(99).required(),
    // .email() -> בודק שזה אימייל תקני
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string().min(3).max(99).required()
  })
  return joiSchema.validate(_reqBody)
}


// וולדיזציה ללוג אין של משתמש
exports.validateLogin = (_reqBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string().min(3).max(99).required(),
  })
  return joiSchema.validate(_reqBody)
}

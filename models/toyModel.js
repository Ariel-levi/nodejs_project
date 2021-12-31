const mongoose = require("mongoose");
const Joi = require("joi");

let toySchema = new mongoose.Schema({
  name: String,
  info: String,
  category: String,
  price: Number,
  img_url: {
    type: String,
    default:
      "https://st.depositphotos.com/1987177/3470/v/950/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg",
  },
  date_created: {
    type: Date,
    default: Date.now(),
  },
  // contain the ID of the user who added the record
  user_id: String,
});

exports.ToyModel = mongoose.model("toys", toySchema);

exports.validateToy = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(99).required(),
    info: Joi.string().min(2).max(99).required(),
    category: Joi.string().min(2).max(99).required(),
    price: Joi.number().min(1).max(999).required(),
    img_url: Joi.string().min(1).max(999).allow(null, ""),
  });
  return joiSchema.validate(_reqBody);
};

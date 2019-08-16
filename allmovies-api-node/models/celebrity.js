const Joi = require("joi");
const mongoose = require("mongoose");

const Celebrity = mongoose.model(
  "Celebrity",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    gender: {
      type: String
    },
    bio: {
      type: String,
      required: true,
      minlength: 5
    },
    dob: {
      type: Object
    }
  })
);

function validateCelebrity(celebrity) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    bio: Joi.string()
      .min(5)
      .required(),
    gender: Joi.string().required(),
    dob: Joi.date()
  };

  return Joi.validate(celebrity, schema);
}

exports.Celeb = Celebrity;
exports.validate = validateCelebrity;

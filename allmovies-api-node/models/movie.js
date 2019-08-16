const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255
    },
    // genre: {
    //   type: genreSchema,
    //   required: true
    // },
    yearOfRelease: {
      type: Number,
      required: true
    },
    plot: {
      type: String,
      required: true,
      minlength: 5
    },
    selectedItems: {
      type: Array,
      required: true
    }
  })
);

function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    //genreId: Joi.objectId().required(),
    yearOfRelease: Joi.number().required(),
    plot: Joi.string()
      .min(5)
      .required(),
    selectedItems: Joi.array().required()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;

const { Celeb, validate } = require("../models/celebrity");
//const { Genre } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const celeb = await Celeb.find()
    .select("-__v")
    .sort("name");
  res.send(celeb);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // const genre = await Genre.findById(req.body.genreId);
  // if (!genre) return res.status(400).send("Invalid genre.");

  const celebrity = new Celeb({
    name: req.body.name,
    // genre: {
    //   _id: genre._id,
    //   name: genre.name
    // },
    gender: req.body.gender,
    bio: req.body.bio,
    dob: req.body.dob
    //publishDate: moment().toJSON()
  });
  await celebrity.save();

  res.send(celebrity);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req.body);
  //const genre = await Genre.findById(req.body.genreId);
  //if (!genre) return res.status(400).send("Invalid genre.");

  const celebrity = await Celeb.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      // genre: {
      //   _id: genre._id,
      //   name: genre.name
      // },
      gender: req.body.gender,
      bio: req.body.bio,
      dob: req.body.dob
    },
    { new: true }
  );

  if (!celebrity)
    return res
      .status(404)
      .send("The celebrity with the given ID was not found.");

  res.send(celebrity);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const celebrity = await Celeb.findByIdAndRemove(req.params.id);

  if (!celebrity)
    return res
      .status(404)
      .send("The celebrity with the given ID was not found.");

  res.send(celebrity);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const celebrity = await Celeb.findById(req.params.id).select("-__v");

  if (!celebrity)
    return res
      .status(404)
      .send("The celebrity with the given ID was not found.");

  res.send(celebrity);
});

module.exports = router;

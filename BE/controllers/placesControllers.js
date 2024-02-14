const { v4: uuid } = require("uuid");
const HttpError = require("../models/http-errors");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../util/location");
const Places = require("../models/places");
const Users = require("../models/users");
const _ = require("lodash");
const mongoose = require("mongoose");

const getPlacesByUserId = async (req, res, next) => {
  const { uid } = req.params;

  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(uid).populate("places");
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again later",
      500
    );
    return next(error);
  }

  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }

  res.json({
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }
  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  try {
    const createdPlace = await Places.create({
      title,
      description,
      address,
      location: coordinates,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
      creator,
    });

    let user;
    try {
      user = await Users.findById(creator);
    } catch (err) {
      const error = new HttpError(
        "Creating place failed, please try again",
        500
      );
      return next(error);
    }

    if (!user) {
      const error = new HttpError("Could not find user for provided id", 404);
      return next(error);
    }

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createdPlace.save({ session: sess });
      user.places.push(createdPlace);
      await user.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        "Creating place failed, please try again.",
        500
      );
      return next(error);
    }

    res.status(201).json({ place: createdPlace.toObject({ getters: true }) });
  } catch (err) {
    next(new HttpError("Creating place failed, please try again"), 500);
  }
};

const getPlaceById = async (req, res, next) => {
  const { pid: placeId } = req.params;
  let place;

  try {
    place = await Places.findById(placeId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find a place", 500)
    );
  }

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided id", 404)
    );
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const updateById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { pid: placeId } = req.params;
  const { title, description } = req.body;

  let place;
  try {
    place = await Places.findById(placeId);
    place.title = title;
    place.description = description;
    await place.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update the place", 500)
    );
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const deleteById = async (req, res, next) => {
  const { pid: placeId } = req.params;
  let place;
  try {
    place = await Places.findById(placeId).populate("creator");
    if (!place) {
      const error = new HttpError("Could not find place for this id.", 404);
      return next(error);
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();
    place.creator.places.pull(place);
    await place.deleteOne({ session: sess });
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  res.json({ msg: "Place deleted successfully" });
};

module.exports = {
  getPlacesByUserId,
  createPlace,
  getPlaceById,
  updateById,
  deleteById,
};

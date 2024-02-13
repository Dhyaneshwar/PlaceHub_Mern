const { v4: uuid } = require("uuid");
const HttpError = require("../models/http-errors");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../util/location");
const Places = require("../models/places");
const _ = require("lodash");

const getPlacesByUserId = async (req, res, next) => {
  const { uid } = req.params;
  let place = [];

  try {
    place = await Places.where("creator", uid).exec();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find a place", 500)
    );
  }

  if (_.isEmpty(place)) {
    return next(
      new HttpError("Could not find a place for the provided id", 404)
    );
  }
  place = place.map((p) => p.toObject({ getters: true }));
  res.json({ place });
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

    res.status(201).json({ place: createdPlace });
  } catch (err) {
    console.log(err);
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
    place = await Places.findById(placeId);
    await place.deleteOne();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete the place", 500)
    );
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

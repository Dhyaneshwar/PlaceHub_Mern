const { v4: uuid } = require("uuid");
const HttpError = require("../models/http-errors");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../util/location");
const Places = require("../models/places");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Emp. State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const getPlacesByUserId = (req, res) => {
  const { uid } = req.params;
  console.log("/user/:uid");
  const place = DUMMY_PLACES.filter((place) => place.creator == uid);
  if (!place) {
    throw new HttpError("Could not find a place for the provided id", 404);
  }
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

const updateById = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { pid: placeId } = req.params;
  const { title, description } = req.body;
  const updatePlace = {
    ...DUMMY_PLACES.find((place) => placeId === place.id),
    title,
    description,
  };
  const updatePlaceIndex = DUMMY_PLACES.findIndex(
    (place) => placeId === place.id
  );

  DUMMY_PLACES[updatePlaceIndex] = updatePlace;
  res.json({ place: updatePlace });
};

const deleteById = (req, res) => {
  const { pid: placeId } = req.params;
  DUMMY_PLACES = DUMMY_PLACES.filter((place) => placeId !== place.id);
  res.json({ msg: "Place deleted successfully" });
};

module.exports = {
  getPlacesByUserId,
  createPlace,
  getPlaceById,
  updateById,
  deleteById,
};

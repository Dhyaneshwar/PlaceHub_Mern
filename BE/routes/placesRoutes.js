const express = require("express");
const HttpError = require("../models/http-errors");

const { check } = require("express-validator");

const {
  getPlacesByUserId,
  createPlace,
  getPlaceById,
  updateById,
  deleteById,
} = require("../controllers/placesControllers");

const router = express.Router();

router.get("/user/:uid", getPlacesByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  createPlace
);

router
  .route("/:pid")
  .get(getPlaceById)
  .patch(
    [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
    updateById
  )
  .delete(deleteById);

module.exports = router;

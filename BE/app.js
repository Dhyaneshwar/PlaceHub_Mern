const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/placesRoutes");
const usersRoutes = require("./routes/usersRoutes");
const HttpError = require("./models/http-errors");

const app = express();

app.use(body_parser.json());

app.use("/api/places", placesRoutes);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  next(new HttpError("No route found", 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER, DB_NAME } = process.env;

mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    PORT = process.env.PORT || 5000;
    app.listen(PORT);
  })
  .catch((err) => console.log(err));

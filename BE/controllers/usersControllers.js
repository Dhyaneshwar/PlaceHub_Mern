const { validationResult } = require("express-validator");
const HttpError = require("../models/http-errors");
const { v4: uuid } = require("uuid");
const User = require("../models/users");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    email: "test@test.com",
    password: "testers",
  },
];

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, { password: 0 });
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }

  const { name, email, password } = req.body;
  let hasUser, createdUser;
  try {
    hasUser = await User.findOne().where({ email }).exec();

    if (hasUser)
      return next(
        new HttpError("Could not create user, email already exists.", 422)
      );

    createdUser = await User.create({
      name,
      email,
      password,
      places: [],
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxkVcY8qefZQ3hVW53Bfj_evcqB2pvtpjPbOz2C2FTQs7W80IFpB4kO56LA4xbBI4ima8&usqp=CAU",
    });
  } catch (err) {
    next(new HttpError("Something went wrong, user was not created", 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  res.json({ message: "Logged in!" });
};

module.exports = {
  getUsers,
  signup,
  login,
};

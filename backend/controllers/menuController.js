import { unlink } from "fs";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import HttpError from "../models/httpError.js";
import Menu from "../models/menuModel.js";
import User from "../models/userModel.js";

import {
  carbsDishes,
  proteinDishes,
  fatsDishes,
  vegetables,
  meatProtein,
} from "../data/courses.js";
export const getMenuById = async (req, res, next) => {
  const menuId = req.params.pid;

  let menu;
  try {
    place = await Menu.findById(menuId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a menu.",
      500
    );
    return next(error);
  }

  if (!menu) {
    const error = new HttpError(
      "Could not find menu for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ menu: menu.toObject({ getters: true }) });
};

export const getMenuesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // let menues;
  let userWithMenues;
  try {
    userWithMenues = await _findById(userId).populate("menues");
  } catch (err) {
    const error = new HttpError(
      "Fetching menues failed, please try again later.",
      500
    );
    return next(error);
  }

  // if (!places || places.length === 0) {
  if (!userWithMenues || userWithMenues.menues.length === 0) {
    return next(
      new HttpError("Could not find menues for the provided user id.", 404)
    );
  }

  res.json({
    menues: userWithMenues.menues.map((menu) =>
      menu.toObject({ getters: true })
    ),
  });
};

export const personalizedMenu = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const userID = req.params.id;
  const { userOwn, age, height, weight, gender, purpuse, health } = req.body;
  let BMR = 0;
  let meal1 = [];
  let meal2 = [];
  let meal3 = [];
  let meal4 = [];
  let meal5 = [];

  if (gender === "female") {
    let BMR = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
  } else {
    let BMR = 66 + 13.7 * weight + 5 * height - 6.8 * age;
  }
  if (purpuse === "weightLoss") {
    BMR = BMR - 300;
  }

  if (1200 < BMR < 1375) {
    // carbsDishes = 8;
    // proteinDishes = 4;
    // meatProtein = 1.5;
    // fatDishes = 5;
    meal1 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      vegetables[Math.floor(Math.random() * 3)],
      vegetables[Math.floor(Math.random() * 3)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal2 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal3 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      meatProtein[Math.floor(Math.random() * 3)],
      meatProtein[Math.floor(Math.random() * 3)],
      meatProtein[Math.floor(Math.random() * 3)],
      vegetables[Math.floor(Math.random() * 3)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal4 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal5 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      vegetables[Math.floor(Math.random() * 3)],
      proteinDishes[Math.floor(Math.random() * 4)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
  } else if (1375 < BMR < 1575) {
    // carbsDishes = 9;
    // proteinDishes = 5;
    // meatProtein = 1.5;
    // fatDishes = 6;
    meal1 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      proteinDishes[Math.floor(Math.random() * 4)],
      vegetables[Math.floor(Math.random() * 3)],
      vegetables[Math.floor(Math.random() * 3)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal2 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal3 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      meatProtein[Math.floor(Math.random() * 3)],
      meatProtein[Math.floor(Math.random() * 3)],
      meatProtein[Math.floor(Math.random() * 3)],
      vegetables[Math.floor(Math.random() * 3)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal4 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal5 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      vegetables[Math.floor(Math.random() * 3)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
  } else if (1575 < BMR < 1825) {
    // carbsDishes = 10;
    // proteinDishes = 6;
    // meatProtein = 2;
    // fatDishes = 7;
    meal1 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      vegetables[Math.floor(Math.random() * 3)],
      vegetables[Math.floor(Math.random() * 3)],
      proteinDishes[Math.floor(Math.random() * 4)],
      proteinDishes[Math.floor(Math.random() * 4)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal2 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal3 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      meatProtein[Math.floor(Math.random() * 3)],
      meatProtein[Math.floor(Math.random() * 3)],
      meatProtein[Math.floor(Math.random() * 3)],
      meatProtein[Math.floor(Math.random() * 3)],
      vegetables[Math.floor(Math.random() * 3)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal4 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal5 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      proteinDishes[Math.floor(Math.random() * 4)],
      vegetables[Math.floor(Math.random() * 3)],
      fatsDishes[Math.floor(Math.random() * 7)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
  } else if (1825 < BMR < 2025) {
    // carbsDishes = 11;
    // proteinDishes = 7;
    // meatProtein = 2;
    // fatDishes = 8;
    meal1 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      proteinDishes[Math.floor(Math.random() * 4)],
      vegetables[Math.floor(Math.random() * 3)],
      vegetables[Math.floor(Math.random() * 3)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal2 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      proteinDishes[Math.floor(Math.random() * 4)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal3 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      meatProtein[Math.floor(Math.random() * 3)],
      meatProtein[Math.floor(Math.random() * 3)],
      meatProtein[Math.floor(Math.random() * 3)],
      meatProtein[Math.floor(Math.random() * 3)],
      vegetables[Math.floor(Math.random() * 3)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal4 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal5 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      proteinDishes[Math.floor(Math.random() * 4)],
      vegetables[Math.floor(Math.random() * 3)],
      fatsDishes[Math.floor(Math.random() * 7)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
  } else {
    // carbsDishes = 12;
    // proteinDishes = 7;
    // meatProtein = 2.5;
    // fatDishes = 9;
    meal1 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      proteinDishes[Math.floor(Math.random() * 4)],
      vegetables[Math.floor(Math.random() * 3)],
      vegetables[Math.floor(Math.random() * 3)],
      fatsDishes[Math.floor(Math.random() * 7)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal2 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      proteinDishes[Math.floor(Math.random() * 4)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal3 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      meatProtein[Math.floor(Math.random() * 3)],
      meatProtein[Math.floor(Math.random() * 3)],
      meatProtein[Math.floor(Math.random() * 3)],
      meatProtein[Math.floor(Math.random() * 3)],
      meatProtein[Math.floor(Math.random() * 3)],
      vegetables[Math.floor(Math.random() * 3)],
      fatsDishes[Math.floor(Math.random() * 7)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal4 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      fatsDishes[Math.floor(Math.random() * 7)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
    meal5 = [
      carbsDishes[Math.floor(Math.random() * 8)],
      carbsDishes[Math.floor(Math.random() * 8)],
      proteinDishes[Math.floor(Math.random() * 4)],
      proteinDishes[Math.floor(Math.random() * 4)],
      vegetables[Math.floor(Math.random() * 3)],
      fatsDishes[Math.floor(Math.random() * 7)],
      fatsDishes[Math.floor(Math.random() * 7)],
    ];
  }

  const createdMenu = new Menu({
    // userID,
    user: userOwn,
    category: purpuse,
    meal1,
    meal2,
    meal3,
    meal4,
    meal5,
  });

  let user;
  try {
    user = await User.findById(req.body.user);
  } catch (err) {
    const error = new HttpError("Creating menu failed, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  // console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    createdMenu.save({ session: sess });
    user.menues.push(createdMenu);
    user.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating menu failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ menu: createdMenu });
};

export const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

export const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Could not find place for this id.", 404);
    return next(error);
  }

  const imagePath = place.image;

  try {
    const sess = await startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Deleted place." });
};
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

const createMenu = async (req, res) => {
  const { id: _id } = req.params;

  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("This id doesnt belong to any user");
  }

  const updatedMenu = await User.findByIdAndUpdate(_id, user, { new: true });

  res.json(updatedMenu);
};

export { createMenu };

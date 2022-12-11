import express from "express";
const router = express.Router();
import userSchema from "./models/userModel.js";
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const UserModel = mongoose.model("UserModel", userSchema);

// UPDATE menu
router.put("/createMenu", async (req, res) => {
  console.log(req.body);
  const user = UserModel.findById(req.user._id);
  // UserModel.findById(req.userData._id);
  if (user) {
    user.age = req.body.age;
    user.height = req.body.height;
    user.weight = req.body.weight;
    user.gender = req.body.gender;
    user.purpuse = req.body.purpuse;
    user.health = req.body.health;
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  user.save();
  res.send({ message: "Menu created successfully" });
});

export default router;

import { Router } from "express";
import { createMenu } from "../controllers/userController";
const router = Router();

// import authentication from "../middlewares/authentication.js";

// router.get("/", getStories);
// router.post("/", authentication, createStory);
router.patch("/:id", createMenu);
// router.delete("/:id", authentication, deleteStory);
// router.patch("/:id/likeStory", authentication, likeStory);

export default router;

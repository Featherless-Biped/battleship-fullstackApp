import express from "express";
import { getUserScores } from "../controllers/scores.js";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id/scores", verifyToken, getUserScores);


/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;

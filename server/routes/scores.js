import express from "express";
import { getAllScores, postNewScore } from "../controllers/scores.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getAllScores);

/* Create */
router.post("/",  postNewScore);

export default router;

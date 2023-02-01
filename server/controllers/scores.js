import Score from "../models/Score.js";
import User from "../models/User.js";

/* CREATE */
export const postNewScore = async (req, res) => {
  try {
    const { userId, score,} = req.body;
    console.log("userId", userId)
    const newScore = new Score({
      userId: userId,
      score: score,
    });
    await newScore.save();
    const addedScore = await Score.find().sort({"score": -1});
    
    res.status(201).json(addedScore);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getAllScores = async (req, res) => {
  try {
    const scores = await Score.find();
    res.status(200).json(scores);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserScores = async (req, res) => {
  try {
    const { userId } = req.params;
    const userScores = await Score.find({ userId });
    res.status(200).json(userScores);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


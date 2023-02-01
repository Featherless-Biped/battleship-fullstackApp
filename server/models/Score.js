import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema(
    {
      
        userId: {
            type: String,
            required: true,
          },
        score: {
            type: Number,
            required: true,
        },
        
    },
    { timestamps: true }
);

const Score = mongoose.model("Score", ScoreSchema);
export default Score;

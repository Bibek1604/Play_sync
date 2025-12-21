import mongoose, { Schema, Document } from "mongoose";

export interface ILeaderboard extends Document {
  room: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  score: number;
}

const LeaderboardSchema = new Schema<ILeaderboard>(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, default: 0 }
  },
  { timestamps: true }
);

LeaderboardSchema.index({ room: 1, user: 1 }, { unique: true });

export default mongoose.model<ILeaderboard>(
  "Leaderboard",
  LeaderboardSchema
);

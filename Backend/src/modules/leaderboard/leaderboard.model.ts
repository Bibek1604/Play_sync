import mongoose, { Schema, Document } from "mongoose";

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  gamesJoined: number;
  gamesCreated: number;
  totalActivity: number; // Primary ranking metric
  lastActive: Date;
}

const LeaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    gamesJoined: { type: Number, default: 0 },
    gamesCreated: { type: Number, default: 0 },
    totalActivity: { type: Number, default: 0 }, // gamesJoined * 2 + gamesCreated
    lastActive: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

LeaderboardSchema.index({ totalActivity: -1 });
LeaderboardSchema.index({ gamesJoined: -1 });

export const LeaderboardModel = mongoose.model<ILeaderboard>(
  "Leaderboard",
  LeaderboardSchema
);

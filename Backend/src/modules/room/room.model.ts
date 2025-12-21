import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
  name: string;
  game: mongoose.Types.ObjectId;
  creator: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  maxPlayers: number;
  status: "open" | "closed";
}

const RoomSchema = new Schema<IRoom>(
  {
    name: { type: String, required: true },
    game: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    maxPlayers: { type: Number, default: 10 },
    status: { type: String, enum: ["open", "closed"], default: "open" }
  },
  { timestamps: true }
);

export default mongoose.model<IRoom>("Room", RoomSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface IGame extends Document {
  gameId: string;
  name: string;
  image: string;

  categoryId: mongoose.Types.ObjectId;

  gameType: "online" | "offline";
  gameMode: "solo" | "1v1" | "multiplayer" | "tournament";

  requiredPlayers: number;
  joinedPlayers: number;
  players: mongoose.Types.ObjectId[];

  location: string;

  pricingType: "free" | "paid";
  price?: number;

  status: "open" | "full" | "started" | "ended";
  createdBy: mongoose.Types.ObjectId;
}

const GameSchema = new Schema(
  {
    gameId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },

    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },

    gameType: { type: String, enum: ["online", "offline"], required: true },
    gameMode: { type: String, enum: ["solo","1v1","multiplayer","tournament"], required: true },

    requiredPlayers: { type: Number, required: true },
    joinedPlayers: { type: Number, default: 0 },
    players: [{ type: Schema.Types.ObjectId, ref: "User" }],

    location: { type: String, default: "global" },

    pricingType: { type: String, enum: ["free", "paid"], default: "free" },
    price: { type: Number, default: 0 },

    status: { type: String, enum: ["open", "full", "started", "ended"], default: "open" },

    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const GameModel = mongoose.model<IGame>("Game", GameSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface IGame extends Document {
  name: string;
  category: mongoose.Types.ObjectId;
  description?: string;
}

const GameSchema = new Schema<IGame>(
  {
    name: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    description: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IGame>("Game", GameSchema);

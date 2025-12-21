import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  room: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  message: string;
}

const ChatSchema = new Schema<IChat>(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IChat>("Chat", ChatSchema);

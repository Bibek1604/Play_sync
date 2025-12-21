import mongoose, { Schema, Document } from "mongoose";

export interface IRoomInvitation extends Document {
  room: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
}

const RoomInvitationSchema = new Schema<IRoomInvitation>(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model<IRoomInvitation>(
  "RoomInvitation",
  RoomInvitationSchema
);

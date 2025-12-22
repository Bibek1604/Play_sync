import mongoose, { Schema, Document } from "mongoose";

export interface IGame extends Document {
  name: string;
  slug: string;
  image: string;
  category: mongoose.Types.ObjectId;
  playType: "online" | "offline";
  description?: string;
  status: "draft" | "active";
  isActive: boolean;
  order: number;
}

const GameSchema = new Schema<IGame>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    image: {
      type: String,
      required: true, // image URL (Cloudinary/S3 later)
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    playType: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },

    description: {
      type: String,
      maxlength: 500,
    },

    status: {
      type: String,
      enum: ["draft", "active"],
      default: "draft",
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

GameSchema.index({ name: 1, category: 1 }, { unique: true });

export default mongoose.model<IGame>("Game", GameSchema);

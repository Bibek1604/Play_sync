import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  type: "online" | "offline";
  image: string;
  description?: string;
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
}

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 300,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const CategoryModel = mongoose.model<ICategory>(
  "Category",
  CategorySchema
);

import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: "online" | "offline";
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    enum: ["online", "offline"],
    required: true,
    unique: true
  }
});

export default mongoose.model<ICategory>("Category", CategorySchema);

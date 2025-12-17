import mongoose from "mongoose";

export type UserRole = "USER" | "ADMIN";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    refreshTokenHash: { type: String, default: null },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
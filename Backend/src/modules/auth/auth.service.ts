import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as UserRepo from "../users/user.repository";
import { AppError } from "../../utils/appError";

import { LoginDto } from "../users/login.dto";

export const login = async (data: LoginDto) => {
  const user = await UserRepo.findByEmail(data.email);
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return {
    token,
    role: user.role,
  };
};

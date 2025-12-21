import bcrypt from "bcryptjs";
import User from "../auth/user.model";
import { signToken } from "../../config/jwt";
import { RegisterDTO, LoginDTO } from "./auth.dto";

export const registerUser = async (data: RegisterDTO) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    username: data.username,
    email: data.email,
    password: hashedPassword
  });

  const token = signToken({ id: user._id, role: user.role });

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    },
    token
  };
};

export const loginUser = async (data: LoginDTO) => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({ id: user._id, role: user.role });

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    },
    token
  };
};

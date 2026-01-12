import * as UserRepo from "./user.repository";
import { AppError } from "../../utils/appError";

export const getMyProfile = async (userId: string) => {
  const user = await UserRepo.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};

export const getAllUsers = async () => {
  return await UserRepo.findAll();
};

export const createUser = async (userData: any) => {
  return await UserRepo.create(userData);
};

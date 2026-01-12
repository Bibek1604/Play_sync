import { Request, Response, NextFunction } from "express";
import * as UserService from "./user.service";
import { successResponse } from "../../utils/responseFormatter";

export const getMyProfile = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.getMyProfile(req.user.id);
    successResponse(res, user, "Profile fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserService.getAllUsers();
    successResponse(res, users, "Users fetched successfully");
  } catch (error) {
    next(error);
  }
};
export const adminCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Implement admin create user logic
    const user = await UserService.createUser(req.body);
    successResponse(res, user, "User created successfully");
  } catch (error) {
    next(error);
  }
};


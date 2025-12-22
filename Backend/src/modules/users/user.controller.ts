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
export function adminCreateUser(arg0: string, auth: (req: any, _res: any, next: any) => any, arg2: (req: any, _res: any, next: any) => any, adminCreateUser: any) {
    throw new Error("Function not implemented.");
}


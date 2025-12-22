import { Request, Response, NextFunction } from "express";
import * as AuthService from "./auth.service";
import { successResponse } from "../../utils/responseFormatter";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AuthService.login(req.body);
    successResponse(res, result, "Login successful");
  } catch (err) {
    next(err);
  }
};

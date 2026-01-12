import { ZodObject  } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./appError";

export const validateDto =
  (schema: ZodObject ) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body); 
      next();
    } catch (err: any) {
      next(new AppError(err.errors[0].message, 400));
    }
  };

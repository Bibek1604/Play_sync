import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json({
        success: true,
        data: await AuthService.register(req.body),
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({
        success: true,
        data: await AuthService.login(req.body),
      });
    } catch (e) {
      next(e);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({
        success: true,
        data: await AuthService.refresh(req.body.refreshToken),
      });
    } catch (e) {
      next(e);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.logout(req.body.refreshToken);
      res.json({ success: true, message: "Logged out" });
    } catch (e) {
      next(e);
    }
  }
}

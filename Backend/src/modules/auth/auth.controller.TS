import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  static async register(req: Request, res: Response) {
    const user = await AuthService.register(req.body);
    res.status(201).json(user);
  }

  static async login(req: Request, res: Response) {
    const tokens = await AuthService.login(req.body);
    res.json(tokens);
  }

  static async refresh(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    const access = await AuthService.refresh(token as string);
    res.json(access);
  }

  static async logout(req: any, res: Response) {
    await AuthService.logout(req.user.sub);
    res.status(204).send();
  }
}

import bcrypt from "bcryptjs";
import crypto from "crypto";
import { UserRepository } from "./auth.repository";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../config/jwt";
import * as RefreshRepo from "./refreshToken.repository";
import { AppError } from "../../utils/appError";

const userRepo = new UserRepository();

const hashToken = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");

export class AuthService {
  static async register(dto: any) {
    if (await userRepo.findByEmail(dto.email))
      throw new AppError("Email already exists", 400);

    const user = await userRepo.create(dto);

    return this.issueTokens(user);
  }

  static async login(dto: any) {
    const user = await userRepo.findByEmail(dto.email);
    if (!user || !(await user.comparePassword(dto.password)))
      throw new AppError("Invalid credentials", 401);

    return this.issueTokens(user);
  }

  static async refresh(refreshToken: string) {
    const payload: any = verifyRefreshToken(refreshToken);
    const tokenHash = hashToken(refreshToken);

    const stored = await RefreshRepo.findValidToken(tokenHash);
    if (!stored) throw new AppError("Invalid refresh token", 401);

    await RefreshRepo.revokeToken(stored._id.toString());

    const user = await userRepo.findById(payload.id);
    if (!user) throw new AppError("User not found", 404);

    return this.issueTokens(user);
  }

  static async logout(refreshToken: string) {
    const tokenHash = hashToken(refreshToken);
    const stored = await RefreshRepo.findValidToken(tokenHash);
    if (stored) await RefreshRepo.revokeToken(stored._id.toString());
  }

  private static async issueTokens(user: any) {
    const accessToken = signAccessToken({
      id: user._id,
      role: user.role,
    });

    const refreshToken = signRefreshToken({
      id: user._id,
    });

    await RefreshRepo.createToken({
      userId: user._id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    };
  }
}

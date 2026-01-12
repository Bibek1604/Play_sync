"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const auth_repository_1 = require("./auth.repository");
const jwt_1 = require("../../config/jwt");
const RefreshRepo = __importStar(require("./refreshToken.repository"));
const appError_1 = require("../../utils/appError");
const userRepo = new auth_repository_1.UserRepository();
const hashToken = (token) => crypto_1.default.createHash("sha256").update(token).digest("hex");
class AuthService {
    static async register(dto) {
        if (await userRepo.findByEmail(dto.email))
            throw new appError_1.AppError("Email already exists", 400);
        const user = await userRepo.create(dto);
        return this.issueTokens(user);
    }
    static async login(dto) {
        const user = await userRepo.findByEmail(dto.email);
        if (!user || !(await user.comparePassword(dto.password)))
            throw new appError_1.AppError("Invalid credentials", 401);
        return this.issueTokens(user);
    }
    static async refresh(refreshToken) {
        const payload = (0, jwt_1.verifyRefreshToken)(refreshToken);
        const tokenHash = hashToken(refreshToken);
        const stored = await RefreshRepo.findValidToken(tokenHash);
        if (!stored)
            throw new appError_1.AppError("Invalid refresh token", 401);
        await RefreshRepo.revokeToken(stored._id.toString());
        const user = await userRepo.findById(payload.id);
        if (!user)
            throw new appError_1.AppError("User not found", 404);
        return this.issueTokens(user);
    }
    static async logout(refreshToken) {
        const tokenHash = hashToken(refreshToken);
        const stored = await RefreshRepo.findValidToken(tokenHash);
        if (stored)
            await RefreshRepo.revokeToken(stored._id.toString());
    }
    static async issueTokens(user) {
        const accessToken = (0, jwt_1.signAccessToken)({
            id: user._id,
            role: user.role,
        });
        const refreshToken = (0, jwt_1.signRefreshToken)({
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
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
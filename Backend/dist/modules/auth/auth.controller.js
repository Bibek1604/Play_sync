"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
class AuthController {
    static async register(req, res, next) {
        try {
            res.status(201).json({
                success: true,
                data: await auth_service_1.AuthService.register(req.body),
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async login(req, res, next) {
        try {
            res.json({
                success: true,
                data: await auth_service_1.AuthService.login(req.body),
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async refresh(req, res, next) {
        try {
            res.json({
                success: true,
                data: await auth_service_1.AuthService.refresh(req.body.refreshToken),
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async logout(req, res, next) {
        try {
            await auth_service_1.AuthService.logout(req.body.refreshToken);
            res.json({ success: true, message: "Logged out" });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
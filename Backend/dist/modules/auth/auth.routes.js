"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validators_1 = require("../../utils/validators");
const router = (0, express_1.Router)();
router.post("/register", validators_1.registerValidation, auth_controller_1.AuthController.register);
router.post("/login", validators_1.loginValidation, auth_controller_1.AuthController.login);
router.post("/refresh", auth_controller_1.AuthController.refresh);
router.post("/logout", auth_controller_1.AuthController.logout);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map
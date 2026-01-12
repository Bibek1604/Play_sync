import { Router } from "express";
import { AuthController } from "./auth.controller";
import { registerValidation, loginValidation } from "../../utils/validators";

const router = Router();

router.post("/register", registerValidation, AuthController.register);
router.post("/login", loginValidation, AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);

export default router;

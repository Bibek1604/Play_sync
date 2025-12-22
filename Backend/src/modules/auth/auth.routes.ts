import { Router } from "express";
import * as AuthController from "./auth.controller";
import { validateDto } from "../../utils/validateDto";
import { LoginDTO } from "../users/login.dto";

const router = Router();

router.post("/login", validateDto(LoginDTO), AuthController.login);

export default router;

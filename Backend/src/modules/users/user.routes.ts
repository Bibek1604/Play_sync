import { Router } from "express";
import * as UserController from "./user.controller";
import { auth, authorize } from "../auth/auth.middleware";

const router = Router();

// 👤 Any logged-in user
router.get("/me", auth, UserController.getMyProfile);

router.post(
  "/admin/create-user",
  [auth, authorize("admin"), UserController.adminCreateUser]
);

export default router;

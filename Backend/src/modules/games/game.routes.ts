import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";
import { create, getByCategory } from "./game.controller";

const router = Router();

router.post("/", authenticate, create);
router.get("/category/:categoryId", getByCategory);

export default router;

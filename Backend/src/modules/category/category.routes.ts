import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";
import { create, getAll } from "./category.controller";

const router = Router();

router.post("/", authenticate, create);     
router.get("/", getAll);

export default router;

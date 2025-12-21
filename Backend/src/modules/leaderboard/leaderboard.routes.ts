import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";
import { update, getByRoom } from "./leaderboard.controller";

const router = Router();

router.post("/update", authenticate, update);
router.get("/room/:roomId", authenticate, getByRoom);

export default router;

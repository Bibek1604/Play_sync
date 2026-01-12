
import { Router } from "express";
import { auth } from "../auth/auth.middleware";
import { LeaderboardController } from "./leaderboard.controller";
import { mongoIdValidation } from "../../utils/validators";

const router = Router();

// Public endpoints - Activity based leaderboard
router.get("/top", LeaderboardController.getTopPlayers); // Most active players
router.get("/top/joined", LeaderboardController.getTopPlayersByGamesJoined); // By games joined

// Authenticated user endpoints
router.get("/me", auth, LeaderboardController.getMyStats);
router.get("/user/:userId", auth, mongoIdValidation("userId"), LeaderboardController.getUserStats);

export default router;

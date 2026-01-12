import { Router } from "express";
import { GameController } from "./game.controller";
import { auth } from "../auth/auth.middleware";
import { adminOnly } from "../auth/auth.admin.middleware";
import {
  createGameValidation,
  updateGameValidation,
} from "../../utils/validators";

const router = Router();

// Normal users can create games
router.post("/", auth, createGameValidation, GameController.create);
router.get("/", auth, GameController.getAll);

// User game history
router.get("/my/created", auth, GameController.getMyCreatedGames);
router.get("/my/joined", auth, GameController.getMyJoinedGames);
router.get("/user/:userId/created", auth, GameController.getUserCreatedGames);
router.get("/user/:userId/joined", auth, GameController.getUserJoinedGames);
router.get("/category", auth, GameController.getByCategory);
router.get("/:gameId", auth, GameController.getById);
router.put("/:gameId", auth, adminOnly, updateGameValidation, GameController.update);
router.delete("/:gameId", auth, adminOnly, GameController.deleteGame);
router.post("/:gameId/join", auth, GameController.join);
router.post("/:gameId/leave", auth, GameController.leave);

export default router;

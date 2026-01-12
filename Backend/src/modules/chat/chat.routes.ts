import { Router } from "express";
import { auth } from "../auth/auth.middleware";
import { gameExists, playerJoined } from "../games/game.middleware";
import { ChatController } from "./chat.controller";
import { sendMessageValidation } from "../../utils/validators";

const router = Router();

router.post("/:gameId", auth, gameExists, playerJoined, sendMessageValidation, ChatController.sendMessage);
router.get("/:gameId", auth, gameExists, playerJoined, ChatController.getMessages);

export default router;

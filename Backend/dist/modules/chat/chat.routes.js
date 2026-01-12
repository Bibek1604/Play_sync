"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../auth/auth.middleware");
const game_middleware_1 = require("../games/game.middleware");
const chat_controller_1 = require("./chat.controller");
const validators_1 = require("../../utils/validators");
const router = (0, express_1.Router)();
router.post("/:gameId", auth_middleware_1.auth, game_middleware_1.gameExists, game_middleware_1.playerJoined, validators_1.sendMessageValidation, chat_controller_1.ChatController.sendMessage);
router.get("/:gameId", auth_middleware_1.auth, game_middleware_1.gameExists, game_middleware_1.playerJoined, chat_controller_1.ChatController.getMessages);
exports.default = router;
//# sourceMappingURL=chat.routes.js.map
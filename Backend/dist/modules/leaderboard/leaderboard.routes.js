"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../auth/auth.middleware");
const leaderboard_controller_1 = require("./leaderboard.controller");
const validators_1 = require("../../utils/validators");
const router = (0, express_1.Router)();
router.get("/top", leaderboard_controller_1.LeaderboardController.getTopPlayers);
router.get("/top/joined", leaderboard_controller_1.LeaderboardController.getTopPlayersByGamesJoined);
router.get("/me", auth_middleware_1.auth, leaderboard_controller_1.LeaderboardController.getMyStats);
router.get("/user/:userId", auth_middleware_1.auth, (0, validators_1.mongoIdValidation)("userId"), leaderboard_controller_1.LeaderboardController.getUserStats);
exports.default = router;
//# sourceMappingURL=leaderboard.routes.js.map
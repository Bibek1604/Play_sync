"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerJoined = exports.gameExists = void 0;
const game_model_1 = require("../games/game.model");
const gameExists = async (req, res, next) => {
    try {
        const { gameId } = req.params;
        const game = await game_model_1.GameModel.findOne({ gameId });
        if (!game) {
            return res.status(404).json({
                success: false,
                message: "Game not found",
            });
        }
        req.game = game;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.gameExists = gameExists;
const playerJoined = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const game = req.game;
        if (!game) {
            return res.status(404).json({
                success: false,
                message: "Game not found",
            });
        }
        const hasJoined = game.players.some((playerId) => playerId.toString() === userId);
        if (!hasJoined) {
            return res.status(403).json({
                success: false,
                message: "You must join the game to perform this action",
            });
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.playerJoined = playerJoined;
//# sourceMappingURL=game.middleware.js.map
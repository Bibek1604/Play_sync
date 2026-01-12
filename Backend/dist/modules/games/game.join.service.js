"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameJoinService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const game_model_1 = require("./game.model");
const leaderboard_service_1 = require("../leaderboard/leaderboard.service");
class GameJoinService {
    static async joinGame(gameId, userId) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const game = await game_model_1.GameModel.findOne({ gameId }).session(session);
            if (!game)
                throw new Error("Game not found");
            if (game.status !== "open")
                throw new Error("Game is not open for joining");
            if (game.players.includes(new mongoose_1.default.Types.ObjectId(userId))) {
                throw new Error("User already joined this game");
            }
            if (game.joinedPlayers >= game.requiredPlayers) {
                throw new Error("Game is full");
            }
            game.players.push(new mongoose_1.default.Types.ObjectId(userId));
            game.joinedPlayers += 1;
            if (game.joinedPlayers >= game.requiredPlayers) {
                game.status = "full";
            }
            await game.save({ session });
            await session.commitTransaction();
            await leaderboard_service_1.LeaderboardService.recordGameJoin(userId);
            return game;
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    static async leaveGame(gameId, userId) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const game = await game_model_1.GameModel.findOne({ gameId }).session(session);
            if (!game)
                throw new Error("Game not found");
            const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
            const playerIndex = game.players.indexOf(userObjectId);
            if (playerIndex === -1) {
                throw new Error("User not in this game");
            }
            game.players.splice(playerIndex, 1);
            game.joinedPlayers -= 1;
            if (game.status === "full" && game.joinedPlayers < game.requiredPlayers) {
                game.status = "open";
            }
            await game.save({ session });
            await session.commitTransaction();
            return game;
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
}
exports.GameJoinService = GameJoinService;
//# sourceMappingURL=game.join.service.js.map
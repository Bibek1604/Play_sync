"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameJoinService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const game_model_1 = require("./game.model");
class GameJoinService {
    static async joinGame(gameId, userId) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const game = await game_model_1.GameModel.findOne({ gameId }).session(session);
            if (!game)
                throw new Error("Game not found");
            if (game.status === "full")
                throw new Error("Game is full");
            if (game.players.includes(userId))
                throw new Error("User already joined");
            game.players.push(userId);
            game.joinedPlayers += 1;
            if (game.joinedPlayers === game.requiredPlayers)
                game.status = "full";
            await game.save({ session });
            await session.commitTransaction();
            return game;
        }
        catch (err) {
            await session.abortTransaction();
            throw err;
        }
        finally {
            session.endSession();
        }
    }
    static async leaveGame(gameId, userId) {
        const game = await game_model_1.GameModel.findOne({ gameId });
        if (!game)
            throw new Error("Game not found");
        if (!game.players.includes(userId))
            throw new Error("User not in game");
        game.players = game.players.filter((id) => id.toString() !== userId);
        game.joinedPlayers -= 1;
        if (game.status === "full")
            game.status = "open";
        await game.save();
        return game;
    }
}
exports.GameJoinService = GameJoinService;
//# sourceMappingURL=join.leave.js.map
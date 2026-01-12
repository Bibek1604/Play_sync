"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const uuid_1 = require("uuid");
const leaderboard_service_1 = require("../leaderboard/leaderboard.service");
class GameService {
    constructor(gameRepo) {
        this.gameRepo = gameRepo;
    }
    async createGame(dto, userId) {
        if (dto.pricingType === "paid" && (!dto.price || dto.price <= 0)) {
            throw new Error("Paid games must have a valid price");
        }
        const existingGame = await this.gameRepo.findActiveGameByCreator(userId);
        if (existingGame) {
            throw new Error("You already have an active game. Please end or delete your current game before creating a new one.");
        }
        const gameId = `GAME-${(0, uuid_1.v4)().slice(0, 8)}`;
        const game = await this.gameRepo.create({
            ...dto,
            gameId,
            createdBy: userId
        });
        game.players.push(new (require('mongoose').Types.ObjectId)(userId));
        game.joinedPlayers = 1;
        await this.gameRepo.save(game);
        await leaderboard_service_1.LeaderboardService.recordGameCreation(userId);
        await leaderboard_service_1.LeaderboardService.recordGameJoin(userId);
        return game;
    }
    async getGamesByCategory(categoryId) {
        return this.gameRepo.findByCategory(categoryId);
    }
    async getAllGames() {
        return this.gameRepo.findAll();
    }
    async getGameById(gameId) {
        const game = await this.gameRepo.findById(gameId);
        if (!game) {
            throw new Error("Game not found");
        }
        return game;
    }
    async updateGame(gameId, dto) {
        const game = await this.gameRepo.findById(gameId);
        if (!game) {
            throw new Error("Game not found");
        }
        return this.gameRepo.updateById(gameId, dto);
    }
    async deleteGame(gameId) {
        const game = await this.gameRepo.findById(gameId);
        if (!game) {
            throw new Error("Game not found");
        }
        return this.gameRepo.deleteById(gameId);
    }
    async getGamesCreatedByUser(userId) {
        return this.gameRepo.findByCreator(userId);
    }
    async getGamesJoinedByUser(userId) {
        return this.gameRepo.findByPlayer(userId);
    }
}
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map
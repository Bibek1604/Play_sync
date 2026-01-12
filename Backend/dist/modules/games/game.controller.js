"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const game_service_1 = require("./game.service");
const game_join_service_1 = require("./game.join.service");
const gameService = new game_service_1.GameService(new (require("./game.repository").GameRepository)());
class GameController {
    static async create(req, res) {
        try {
            const game = await gameService.createGame(req.body, req.user.id);
            res.status(201).json({ success: true, data: game });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
    static async getByCategory(req, res) {
        const { categoryId } = req.query;
        if (!categoryId)
            return res.status(400).json({ message: "categoryId required" });
        const games = await gameService.getGamesByCategory(categoryId);
        res.status(200).json({ success: true, data: games });
    }
    static async getAll(req, res) {
        try {
            const games = await gameService.getAllGames();
            res.status(200).json({ success: true, data: games });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
    static async getById(req, res) {
        try {
            const game = await gameService.getGameById(req.params.gameId);
            res.status(200).json({ success: true, data: game });
        }
        catch (err) {
            res.status(404).json({ success: false, message: err.message });
        }
    }
    static async update(req, res) {
        try {
            const game = await gameService.updateGame(req.params.gameId, req.body);
            res.status(200).json({ success: true, data: game });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
    static async deleteGame(req, res) {
        try {
            await gameService.deleteGame(req.params.gameId);
            res.status(200).json({ success: true, message: "Game deleted successfully" });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
    static async join(req, res) {
        try {
            const game = await game_join_service_1.GameJoinService.joinGame(req.params.gameId, req.user.id);
            res.status(200).json({ success: true, data: game });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
    static async leave(req, res) {
        try {
            const game = await game_join_service_1.GameJoinService.leaveGame(req.params.gameId, req.user.id);
            res.status(200).json({ success: true, data: game });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
    static async getMyCreatedGames(req, res) {
        try {
            const games = await gameService.getGamesCreatedByUser(req.user.id);
            res.status(200).json({ success: true, data: games });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
    static async getMyJoinedGames(req, res) {
        try {
            const games = await gameService.getGamesJoinedByUser(req.user.id);
            res.status(200).json({ success: true, data: games });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
    static async getUserCreatedGames(req, res) {
        try {
            const games = await gameService.getGamesCreatedByUser(req.params.userId);
            res.status(200).json({ success: true, data: games });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
    static async getUserJoinedGames(req, res) {
        try {
            const games = await gameService.getGamesJoinedByUser(req.params.userId);
            res.status(200).json({ success: true, data: games });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
}
exports.GameController = GameController;
//# sourceMappingURL=game.controller.js.map
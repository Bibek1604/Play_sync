"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardController = void 0;
const leaderboard_service_1 = require("./leaderboard.service");
class LeaderboardController {
    static async getTopPlayers(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const players = await leaderboard_service_1.LeaderboardService.getMostActivePlayers(limit);
            res.status(200).json({
                success: true,
                data: players
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    static async getTopPlayersByGamesJoined(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const players = await leaderboard_service_1.LeaderboardService.getTopPlayersByGamesJoined(limit);
            res.status(200).json({
                success: true,
                data: players
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    static async getMyStats(req, res) {
        try {
            const userId = req.user.id;
            const stats = await leaderboard_service_1.LeaderboardService.getUserStats(userId);
            const rank = await leaderboard_service_1.LeaderboardService.getUserRank(userId);
            res.status(200).json({
                success: true,
                data: {
                    ...stats.toObject(),
                    rank
                }
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    static async getUserStats(req, res) {
        try {
            const { userId } = req.params;
            const stats = await leaderboard_service_1.LeaderboardService.getUserStats(userId);
            const rank = await leaderboard_service_1.LeaderboardService.getUserRank(userId);
            res.status(200).json({
                success: true,
                data: {
                    ...stats.toObject(),
                    rank
                }
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}
exports.LeaderboardController = LeaderboardController;
//# sourceMappingURL=leaderboard.controller.js.map
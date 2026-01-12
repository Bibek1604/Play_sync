"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardService = void 0;
const leaderboard_model_1 = require("./leaderboard.model");
const mongoose_1 = __importDefault(require("mongoose"));
class LeaderboardService {
    static async getOrCreateUserStats(userId) {
        let stats = await leaderboard_model_1.LeaderboardModel.findOne({ userId });
        if (!stats) {
            stats = await leaderboard_model_1.LeaderboardModel.create({
                userId: new mongoose_1.default.Types.ObjectId(userId),
                gamesJoined: 0,
                gamesCreated: 0,
                totalActivity: 0,
                lastActive: new Date()
            });
        }
        return stats;
    }
    static async recordGameJoin(userId) {
        const stats = await this.getOrCreateUserStats(userId);
        stats.gamesJoined += 1;
        stats.totalActivity = (stats.gamesJoined * 2) + stats.gamesCreated;
        stats.lastActive = new Date();
        return await stats.save();
    }
    static async recordGameCreation(userId) {
        const stats = await this.getOrCreateUserStats(userId);
        stats.gamesCreated += 1;
        stats.totalActivity = (stats.gamesJoined * 2) + stats.gamesCreated;
        stats.lastActive = new Date();
        return await stats.save();
    }
    static async getMostActivePlayers(limit = 10) {
        return await leaderboard_model_1.LeaderboardModel.find()
            .populate("userId", "fullName email")
            .sort({ totalActivity: -1, lastActive: -1 })
            .limit(limit);
    }
    static async getTopPlayersByGamesJoined(limit = 10) {
        return await leaderboard_model_1.LeaderboardModel.find()
            .populate("userId", "fullName email")
            .sort({ gamesJoined: -1 })
            .limit(limit);
    }
    static async getUserStats(userId) {
        return await this.getOrCreateUserStats(userId);
    }
    static async getUserRank(userId) {
        const userStats = await this.getOrCreateUserStats(userId);
        const rank = await leaderboard_model_1.LeaderboardModel.countDocuments({
            $or: [
                { totalActivity: { $gt: userStats.totalActivity } },
                {
                    totalActivity: userStats.totalActivity,
                    lastActive: { $gt: userStats.lastActive }
                }
            ]
        });
        return rank + 1;
    }
}
exports.LeaderboardService = LeaderboardService;
//# sourceMappingURL=leaderboard.service.js.map
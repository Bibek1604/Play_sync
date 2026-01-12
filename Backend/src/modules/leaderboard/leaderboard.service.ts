import { LeaderboardModel } from "./leaderboard.model";
import mongoose from "mongoose";

export class LeaderboardService {
  /**
   * Get or create leaderboard entry for a user
   */
  static async getOrCreateUserStats(userId: string) {
    let stats = await LeaderboardModel.findOne({ userId });
    
    if (!stats) {
      stats = await LeaderboardModel.create({
        userId: new mongoose.Types.ObjectId(userId),
        gamesJoined: 0,
        gamesCreated: 0,
        totalActivity: 0,
        lastActive: new Date()
      });
    }
    
    return stats;
  }

  /**
   * Update activity when user joins a game
   */
  static async recordGameJoin(userId: string) {
    const stats = await this.getOrCreateUserStats(userId);
    
    stats.gamesJoined += 1;
    stats.totalActivity = (stats.gamesJoined * 2) + stats.gamesCreated; // Joining = 2 points
    stats.lastActive = new Date();
    
    return await stats.save();
  }

  /**
   * Update activity when user creates a game
   */
  static async recordGameCreation(userId: string) {
    const stats = await this.getOrCreateUserStats(userId);
    
    stats.gamesCreated += 1;
    stats.totalActivity = (stats.gamesJoined * 2) + stats.gamesCreated; // Creating = 1 point
    stats.lastActive = new Date();
    
    return await stats.save();
  }

  /**
   * Get most active players (primary leaderboard)
   */
  static async getMostActivePlayers(limit: number = 10) {
    return await LeaderboardModel.find()
      .populate("userId", "fullName email")
      .sort({ totalActivity: -1, lastActive: -1 })
      .limit(limit);
  }

  /**
   * Get top players by games joined
   */
  static async getTopPlayersByGamesJoined(limit: number = 10) {
    return await LeaderboardModel.find()
      .populate("userId", "fullName email")
      .sort({ gamesJoined: -1 })
      .limit(limit);
  }

  /**
   * Get user's leaderboard stats
   */
  static async getUserStats(userId: string) {
    return await this.getOrCreateUserStats(userId);
  }

  /**
   * Get user's rank by activity
   */
  static async getUserRank(userId: string) {
    const userStats = await this.getOrCreateUserStats(userId);
    const rank = await LeaderboardModel.countDocuments({
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

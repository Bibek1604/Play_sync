import { Request, Response } from "express";
import { LeaderboardService } from "./leaderboard.service";

export class LeaderboardController {
  /**
   * Get most active players (primary leaderboard)
   */
  static async getTopPlayers(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const players = await LeaderboardService.getMostActivePlayers(limit);
      
      res.status(200).json({
        success: true,
        data: players
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Get top players by games joined
   */
  static async getTopPlayersByGamesJoined(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const players = await LeaderboardService.getTopPlayersByGamesJoined(limit);
      
      res.status(200).json({
        success: true,
        data: players
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Get current user's stats
   */
  static async getMyStats(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const stats = await LeaderboardService.getUserStats(userId);
      const rank = await LeaderboardService.getUserRank(userId);
      
      res.status(200).json({
        success: true,
        data: {
          ...stats.toObject(),
          rank
        }
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Get user stats by ID (admin or self)
   */
  static async getUserStats(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const stats = await LeaderboardService.getUserStats(userId);
      const rank = await LeaderboardService.getUserRank(userId);
      
      res.status(200).json({
        success: true,
        data: {
          ...stats.toObject(),
          rank
        }
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

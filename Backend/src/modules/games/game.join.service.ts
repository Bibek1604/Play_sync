import mongoose from "mongoose";
import { GameModel } from "./game.model";
import { LeaderboardService } from "../leaderboard/leaderboard.service";

export class GameJoinService {
  static async joinGame(gameId: string, userId: string) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const game = await GameModel.findOne({ gameId }).session(session);
      if (!game) throw new Error("Game not found");

      if (game.status !== "open") throw new Error("Game is not open for joining");

      if (game.players.includes(new mongoose.Types.ObjectId(userId))) {
        throw new Error("User already joined this game");
      }

      if (game.joinedPlayers >= game.requiredPlayers) {
        throw new Error("Game is full");
      }

      game.players.push(new mongoose.Types.ObjectId(userId));
      game.joinedPlayers += 1;

      if (game.joinedPlayers >= game.requiredPlayers) {
        game.status = "full";
      }

      await game.save({ session });
      await session.commitTransaction();

      // Update leaderboard activity (outside transaction)
      await LeaderboardService.recordGameJoin(userId);

      return game;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async leaveGame(gameId: string, userId: string) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const game = await GameModel.findOne({ gameId }).session(session);
      if (!game) throw new Error("Game not found");

      const userObjectId = new mongoose.Types.ObjectId(userId);
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
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
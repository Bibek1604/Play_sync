import mongoose from "mongoose";
import { GameModel } from "./game.model";

export class GameJoinService {
  static async joinGame(gameId: string, userId: string) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const game = await GameModel.findOne({ gameId }).session(session);
      if (!game) throw new Error("Game not found");
      if (game.status === "full") throw new Error("Game is full");
      if (game.players.includes(userId as any)) throw new Error("User already joined");

      game.players.push(userId as any);
      game.joinedPlayers += 1;

      if (game.joinedPlayers === game.requiredPlayers) game.status = "full";

      await game.save({ session });
      await session.commitTransaction();
      return game;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }

  static async leaveGame(gameId: string, userId: string) {
    const game = await GameModel.findOne({ gameId });
    if (!game) throw new Error("Game not found");
    if (!game.players.includes(userId as any)) throw new Error("User not in game");

    game.players = game.players.filter((id) => id.toString() !== userId);
    game.joinedPlayers -= 1;

    if (game.status === "full") game.status = "open";

    await game.save();
    return game;
  }
}

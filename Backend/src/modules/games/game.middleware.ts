import { Request, Response, NextFunction } from "express";
import { GameModel } from "../games/game.model";

/**
 * Middleware to check if game exists
 */
export const gameExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { gameId } = req.params;
    const game = await GameModel.findOne({ gameId });

    if (!game) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    // Attach game to request for use in subsequent middleware/controllers
    (req as any).game = game;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to check if user has joined the game
 */
export const playerJoined = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const game = (req as any).game;

    if (!game) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    const hasJoined = game.players.some(
      (playerId: any) => playerId.toString() === userId
    );

    if (!hasJoined) {
      return res.status(403).json({
        success: false,
        message: "You must join the game to perform this action",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

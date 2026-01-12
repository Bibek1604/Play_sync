import { Request, Response } from "express";
import { GameService } from "./game.service";
import { GameJoinService } from "./game.join.service";

const gameService = new GameService(new (require("./game.repository").GameRepository)());

export class GameController {
  static async create(req: Request, res: Response) {
    try {
      const game = await gameService.createGame(req.body, req.user!.id);
      res.status(201).json({ success: true, data: game });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async getByCategory(req: Request, res: Response) {
    const { categoryId } = req.query;
    if (!categoryId) return res.status(400).json({ message: "categoryId required" });
    const games = await gameService.getGamesByCategory(categoryId as string);
    res.status(200).json({ success: true, data: games });
  }

  static async getAll(req: Request, res: Response) {
    try {
      const games = await gameService.getAllGames();
      res.status(200).json({ success: true, data: games });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const game = await gameService.getGameById(req.params.gameId);
      res.status(200).json({ success: true, data: game });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const game = await gameService.updateGame(req.params.gameId, req.body);
      res.status(200).json({ success: true, data: game });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async deleteGame(req: Request, res: Response) {
    try {
      await gameService.deleteGame(req.params.gameId);
      res.status(200).json({ success: true, message: "Game deleted successfully" });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async join(req: Request, res: Response) {
    try {
      const game = await GameJoinService.joinGame(req.params.gameId, req.user!.id);
      res.status(200).json({ success: true, data: game });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async leave(req: Request, res: Response) {
    try {
      const game = await GameJoinService.leaveGame(req.params.gameId, req.user!.id);
      res.status(200).json({ success: true, data: game });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async getMyCreatedGames(req: Request, res: Response) {
    try {
      const games = await gameService.getGamesCreatedByUser(req.user!.id);
      res.status(200).json({ success: true, data: games });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async getMyJoinedGames(req: Request, res: Response) {
    try {
      const games = await gameService.getGamesJoinedByUser(req.user!.id);
      res.status(200).json({ success: true, data: games });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async getUserCreatedGames(req: Request, res: Response) {
    try {
      const games = await gameService.getGamesCreatedByUser(req.params.userId);
      res.status(200).json({ success: true, data: games });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async getUserJoinedGames(req: Request, res: Response) {
    try {
      const games = await gameService.getGamesJoinedByUser(req.params.userId);
      res.status(200).json({ success: true, data: games });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}

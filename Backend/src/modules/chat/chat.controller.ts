import { Request, Response } from "express";
import { ChatModel } from "./chat.model";
import { GameModel } from "../games/game.model";

export class ChatController {
  static async sendMessage(req: Request, res: Response) {
    try {
      const { gameId } = req.params;
      const { message } = req.body;
      const userId = req.user!.id;

      // Check if user joined this game
      const game = await GameModel.findOne({ gameId });
      if (!game || !game.players.some(p => p.toString() === userId)) {
        return res.status(403).json({
          success: false,
          message: "Join the game to send messages",
        });
      }

      const chat = await ChatModel.create({
        gameId,
        senderId: userId,
        message,
      });

      return res.status(201).json({
        success: true,
        data: chat,
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

  static async getMessages(req: Request, res: Response) {
    try {
      const { gameId } = req.params;
      const userId = req.user!.id;

      const game = await GameModel.findOne({ gameId });
      if (!game || !game.players.some(p => p.toString() === userId)) {
        return res.status(403).json({
          success: false,
          message: "Join the game to view messages",
        });
      }

      const messages = await ChatModel.find({ gameId }).sort({ createdAt: 1 });

      return res.status(200).json({
        success: true,
        data: messages,
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
}

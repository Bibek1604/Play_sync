"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const chat_model_1 = require("./chat.model");
const game_model_1 = require("../games/game.model");
class ChatController {
    static async sendMessage(req, res) {
        try {
            const { gameId } = req.params;
            const { message } = req.body;
            const userId = req.user.id;
            const game = await game_model_1.GameModel.findOne({ gameId });
            if (!game || !game.players.some(p => p.toString() === userId)) {
                return res.status(403).json({
                    success: false,
                    message: "Join the game to send messages",
                });
            }
            const chat = await chat_model_1.ChatModel.create({
                gameId,
                senderId: userId,
                message,
            });
            return res.status(201).json({
                success: true,
                data: chat,
            });
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }
    static async getMessages(req, res) {
        try {
            const { gameId } = req.params;
            const userId = req.user.id;
            const game = await game_model_1.GameModel.findOne({ gameId });
            if (!game || !game.players.some(p => p.toString() === userId)) {
                return res.status(403).json({
                    success: false,
                    message: "Join the game to view messages",
                });
            }
            const messages = await chat_model_1.ChatModel.find({ gameId }).sort({ createdAt: 1 });
            return res.status(200).json({
                success: true,
                data: messages,
            });
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map
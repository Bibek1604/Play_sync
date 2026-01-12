"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSocket = void 0;
const chat_service_1 = require("../modules/chat/chat.service");
const game_model_1 = require("../modules/games/game.model");
const chatSocket = (io) => {
    io.on("connection", (socket) => {
        socket.on("join-room", (gameId) => {
            socket.join(gameId);
        });
        socket.on("send-message", async ({ gameId, message }) => {
            const userId = socket.data.user.id;
            const game = await game_model_1.GameModel.findOne({ gameId });
            if (!game || !game.players.includes(userId)) {
                socket.emit("error", { message: "You are not part of this game" });
                return;
            }
            const savedMessage = await (0, chat_service_1.saveMessage)(gameId, userId, message);
            io.to(gameId).emit("new-message", {
                gameId,
                message: savedMessage.message,
                sender: socket.data.user,
                createdAt: savedMessage.get("createdAt")
            });
        });
        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });
};
exports.chatSocket = chatSocket;
//# sourceMappingURL=chat.socket.js.map
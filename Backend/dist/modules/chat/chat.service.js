"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesByGame = exports.saveMessage = void 0;
const chat_model_1 = require("./chat.model");
const saveMessage = async (gameId, senderId, message) => {
    return await chat_model_1.ChatModel.create({
        gameId,
        senderId,
        message
    });
};
exports.saveMessage = saveMessage;
const getMessagesByGame = async (gameId) => {
    return await chat_model_1.ChatModel.find({ gameId })
        .populate("senderId", "fullName email")
        .sort({ createdAt: 1 });
};
exports.getMessagesByGame = getMessagesByGame;
//# sourceMappingURL=chat.service.js.map
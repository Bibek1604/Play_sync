import { ChatModel as Chat } from "./chat.model";

export const saveMessage = async (
  gameId: string,
  senderId: string,
  message: string
) => {
  return await Chat.create({
    gameId,
    senderId,
    message
  });
};

export const getMessagesByGame = async (gameId: string) => {
  return await Chat.find({ gameId })
    .populate("senderId", "fullName email")
    .sort({ createdAt: 1 });
};
